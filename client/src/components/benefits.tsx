"use client"

import { motion } from "framer-motion"
import { Zap, Bell, Crown, MessageSquare } from "lucide-react"

const benefits = [
  {
    icon: Crown,
    title: "Early Access",
    desc: "Skip the line and be among the first to explore the full library of mental models.",
    color: "#a3a3a3",
  },
  {
    icon: Bell,
    title: "Product Updates",
    desc: "Get exclusive insights into new frameworks, features, and our development roadmap.",
    color: "#a3a3a3",
  },
  {
    icon: Zap,
    title: "Premium Features",
    desc: "Early adopters receive special access to premium features and beta programs.",
    color: "#a3a3a3",
  },
  {
    icon: MessageSquare,
    title: "Priority Feedback",
    desc: "Direct line to the founding team. Your input shapes the future of the platform.",
    color: "#a3a3a3",
  },
]

export default function Benefits() {
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
            Perks
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            What you{" "}
            <span className="text-[#525252]">get</span>
          </h2>
          <p className="mt-3 text-lg text-[#a3a3a3]">
            Join the waitlist and unlock exclusive benefits.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#050505] p-8 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-black/20"
                style={{ background: `${benefit.color}15`, border: `1px solid ${benefit.color}30`, color: benefit.color }}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-[#737373]">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
