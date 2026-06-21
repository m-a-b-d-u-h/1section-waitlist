"use client"

import { motion } from "framer-motion"
import { Network, Headphones, Sparkles, Award, ArrowRight } from "lucide-react"

const cards = [
  {
    icon: Network,
    title: "Knowledge Graphs",
    desc: "Visualize how mental models interconnect. Interactive nodes and edges reveal hidden relationships between every framework in the library.",
    stat: "Coming in v1.0",
    color: "#3b82f6",
  },
  {
    icon: Headphones,
    title: "Text-to-Speech Narration",
    desc: "Listen to any theory with natural TTS narration. Word-level highlighting helps you follow along, perfect for learning on the go.",
    stat: "Audio for all 200+ models",
    color: "#10b981",
  },
  {
    icon: Sparkles,
    title: "Daily Free Theory",
    desc: "A new professional framework unlocks every 24 hours. Build a daily learning habit without commitment, one mental model at a time.",
    stat: "Refreshes daily",
    color: "#8b5cf6",
  },
  {
    icon: Award,
    title: "Quizzes & XP System",
    desc: "Test your understanding with interactive quizzes, earn XP for correct answers, track streaks, and unlock achievements as you progress.",
    stat: "Gamified learning",
    color: "#f97316",
  },
]

export default function Analysis() {
  return (
    <section id="analysis" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#fb923c]">
            Features
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl text-white/80">
            What&apos;s coming to{" "}
            <span className="text-[#fb923c]">1section</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/40">
            Every feature is designed to help you collect, connect, and apply
            mental models effortlessly.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-8 transition-all duration-300 hover:border-white/10"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${card.color}15, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-black/20"
                  style={{ background: `${card.color}15`, border: `1px solid ${card.color}30`, color: card.color }}
                >
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading mb-2 text-xl font-bold text-white/80">{card.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/40">{card.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: card.color }}>
                  <span>{card.stat}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
