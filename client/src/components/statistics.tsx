"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

type StatsData = {
  waitlist: number
  visitors: number
  feedback: number
}

function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = to / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Statistics() {
  const [data, setData] = useState<StatsData>({ waitlist: 0, visitors: 0, feedback: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [waitlistRes, analyticsRes, feedbackRes] = await Promise.all([
          fetch(`${API}/api/waitlist/count`),
          fetch(`${API}/api/analytics`),
          fetch(`${API}/api/feedback/count`),
        ])
        const wl = await waitlistRes.json()
        const an = await analyticsRes.json()
        const fb = await feedbackRes.json()
        setData({
          waitlist: wl?.data?.count ?? 0,
          visitors: an?.data?.totalVisitors ?? 0,
          feedback: fb?.data?.count ?? 0,
        })
      } catch {
        setData({ waitlist: 0, visitors: 0, feedback: 0 })
      } finally {
        setLoaded(true)
      }
    }
    fetchStats()
  }, [])

  const conversionRate =
    data.visitors > 0
      ? Math.round((data.waitlist / data.visitors) * 100)
      : 0

  const stats = [
    { value: data.visitors, suffix: "", label: "total visitors", icon: "👀" },
    { value: data.waitlist, suffix: "", label: "waitlist signups", icon: "👥" },
    { value: conversionRate, suffix: "%", label: "conversion rate", icon: "📊" },
    { value: data.feedback, suffix: "", label: "feedback submissions", icon: "💬" },
  ]

  return (
    <section className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            Impact
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            Growing every{" "}
            <span className="text-[#525252]">day</span>
          </h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#050505]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="grid divide-y divide-white/5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center px-8 py-12 text-center transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <span className="text-3xl">{stat.icon}</span>
                <span className="mt-4 font-heading text-4xl font-black sm:text-5xl" style={{ background: 'linear-gradient(to right, #fff, #a3a3a3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {loaded ? <AnimatedCounter to={stat.value} suffix={stat.suffix} /> : <span>0</span>}
                </span>
                <span className="mt-2 text-sm text-[#737373]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {!loaded && (
          <p className="mt-4 text-center text-xs text-[#525252]">Loading stats...</p>
        )}
      </div>
    </section>
  )
}
