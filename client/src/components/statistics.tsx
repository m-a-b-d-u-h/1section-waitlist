"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Eye, Users, TrendingUp, MessageSquare } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

type StatsData = {
  waitlist: number
  visitors: number
  feedback: number
}

const icons = [Eye, Users, TrendingUp, MessageSquare]

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
    { value: data.visitors, suffix: "", label: "Total Visitors" },
    { value: data.waitlist, suffix: "", label: "Waitlist Signups" },
    { value: conversionRate, suffix: "%", label: "Conversion Rate" },
    { value: data.feedback, suffix: "", label: "Feedback Submissions" },
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
            Statistics
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            By the{" "}
            <span className="text-[#525252]">Numbers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#a3a3a3]">
            Real-time stats from the platform.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-8 transition-all duration-300 hover:border-white/20"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-[#a3a3a3]" />
                  </div>
                  <p className="font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">
                    {loaded ? (
                      <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span className="text-[#525252]">—</span>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-[#737373]">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {!loaded && (
          <p className="mt-6 text-center text-xs text-[#525252]">Loading stats...</p>
        )}
      </div>
    </section>
  )
}
