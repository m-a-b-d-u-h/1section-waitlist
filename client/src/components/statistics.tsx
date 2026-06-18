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
  const ref = useRef<HTMLDivElement>(null)
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

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>
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
    { value: data.visitors, suffix: "", label: "Total Visitors", icon: Eye },
    { value: data.waitlist, suffix: "", label: "Waitlist Signups", icon: Users },
    { value: conversionRate, suffix: "%", label: "Conversion Rate", icon: TrendingUp },
    { value: data.feedback, suffix: "", label: "Feedback Submissions", icon: MessageSquare },
  ]

  return (
    <section className="relative w-full py-32 sm:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-white/[0.015] blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] transition-all duration-300 hover:border-white/20"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-white/20 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#a3a3a3]" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#525252]"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a3a3a3] animate-pulse" />
                      Live
                    </motion.div>
                  </div>

                  <div className="text-center font-heading text-5xl font-black tracking-[-0.03em] sm:text-6xl">
                    {loaded ? (
                      <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span className="text-[#525252]">—</span>
                    )}
                  </div>
                  <p className="mt-2 text-center text-sm text-[#737373]">{stat.label}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
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
