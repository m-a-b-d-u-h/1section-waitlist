"use client"

import { motion } from "framer-motion"
import { BookOpen, Zap, Network } from "lucide-react"

const steps = [
  {
    icon: Network,
    title: "Explore",
    desc: "Browse an expansive library of mental models, filter by category, and discover your daily free theory.",
    features: [
      "200+ cognitive frameworks",
      "22 categories to explore",
      "Daily free mental model",
      "Smart search & filters",
    ],
    color: "#a3a3a3",
  },
  {
    icon: BookOpen,
    title: "Learn",
    desc: "Read with immersive TTS narration, highlight key passages, and track your progress automatically.",
    features: [
      "Text-to-speech narration",
      "Word-level highlighting",
      "Custom reading preferences",
      "Progress auto-save",
    ],
    color: "#a3a3a3",
  },
  {
    icon: Zap,
    title: "Master",
    desc: "Build action protocols, reflect with guided prompts, quiz yourself, and visualize connections in your knowledge graph.",
    features: [
      "Interactive knowledge graphs",
      "Quizzes & reflections",
      "Action plans & highlights",
      "XP & streak system",
    ],
    color: "#a3a3a3",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            How It Works
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            How It{" "}
            <span className="text-[#525252]">Works</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#a3a3a3]">
            Transform your thinking in three simple steps.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="absolute left-1/2 top-[72px] hidden h-[calc(100%-144px)] w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:even:mt-16"
            >
              <div className="relative z-10 rounded-2xl border border-white/5 bg-[#050505] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
                <div
                  className="mb-2 text-xs font-bold uppercase tracking-[0.1em]"
                  style={{ color: step.color }}
                >
                  Step 0{i + 1}
                </div>
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}
                >
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading mb-3 text-2xl font-black text-white">
                  {step.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-[#737373]">
                  {step.desc}
                </p>
                <ul className="space-y-2.5">
                  {step.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#525252]">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: step.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
