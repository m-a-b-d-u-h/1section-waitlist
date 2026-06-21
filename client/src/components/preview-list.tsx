"use client"

import { motion } from "framer-motion"

const items = [
  {
    title: "Dashboard",
    desc: "Your command center. See your progress, recommended modules, recent activity, and learning streaks at a glance.",
  },
  {
    title: "Explore Modules",
    desc: "Browse the full collection of mental models. Filter by category, search by keyword, or discover your daily free theory.",
  },
  {
    title: "Reading View",
    desc: "Dive deep into each mental model with rich reading content, text-to-speech narration, and word-level highlighting.",
  },
  {
    title: "Learning Path",
    desc: "Follow structured learning paths that guide you through interconnected mental models, building mastery step by step.",
  },
  {
    title: "Quiz",
    desc: "Test your understanding with interactive quizzes. Review explanations, track scores, and earn XP for each correct answer.",
  },
]

export default function PreviewList() {
  return (
    <section id="preview" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[600px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            Preview
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            Take a look{" "}
            <span className="text-[#525252]">inside</span>
          </h2>
          <p className="mt-3 text-lg text-[#a3a3a3]">
            A first look at your future dashboard — your command center with progress tracking, a library of mental models, daily bite-sized lessons, personal insights on your growth, and a community of fellow thinkers.
          </p>
        </motion.div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors hover:bg-white/[0.05]"
            >
              <h3 className="font-heading text-lg font-bold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
