"use client"

import { motion } from "framer-motion"

const pages = [
  {
    title: "Dashboard",
    badge: "Dashboard",
    desc: "Your command center. See your progress, recommended modules, recent activity, and learning streaks at a glance.",
  },
  {
    title: "Explore Modules",
    badge: "Library",
    desc: "Browse the full collection of mental models. Filter by category, search by keyword, or discover your daily free theory.",
  },
  {
    title: "Reading View",
    badge: "Learn",
    desc: "Dive deep into each mental model with rich reading content, text-to-speech narration, and word-level highlighting.",
  },
]

export default function PreviewList() {
  return (
    <section id="preview" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
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

        <div className="space-y-12">
          {pages.map((page, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="overflow-hidden rounded-xl">
                {i === 0 ? (
                  <img src="/features/Screenshot_18-4-2026_12621_localhost.jpeg" alt="Dashboard" className="w-full" />
                ) : i === 1 ? (
                  <img src="/features/screenshot-1779446043467.png" alt="Explore Modules" className="w-full" />
                ) : (
                  <img src="/features/image%202.png" alt="Reading View" className="w-full" />
                )}
              </div>
              <div className="mt-6 px-1">
                <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#525252]">
                  {page.badge}
                </span>
                <h3 className="font-heading text-2xl font-black tracking-[-0.02em] text-white">
                  {page.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#737373]">
                  {page.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
