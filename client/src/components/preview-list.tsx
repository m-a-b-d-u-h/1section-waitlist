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
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050505] transition-all duration-500 hover:border-white/10"
            >
              {i === 0 ? (
                <img src="/features/Screenshot_18-4-2026_12621_localhost.jpeg" alt="Dashboard" className="w-full" />
              ) : i === 1 ? (
                <img src="/features/screenshot-1779446043467.png" alt="Explore Modules" className="w-full" />
              ) : (
                <img src="/features/image%202.png" alt="Reading View" className="w-full" />
              )}
              <div className="flex min-h-[160px] flex-col border-t border-white/10 p-5 sm:p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                    {page.badge}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-black tracking-[-0.02em] sm:text-2xl">
                  {page.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#737373]">
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
