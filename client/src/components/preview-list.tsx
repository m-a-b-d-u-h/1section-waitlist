"use client"

import { motion } from "framer-motion"

const pages = [
  {
    title: "Dashboard",
    badge: "Dashboard",
    desc: "Your command center. See your progress, recommended modules, recent activity, and learning streaks at a glance.",
    image: "/features/Screenshot_18-4-2026_12621_localhost.jpeg",
    color: "#3b82f6",
  },
  {
    title: "Explore Modules",
    badge: "Library",
    desc: "Browse the full collection of mental models. Filter by category, search by keyword, or discover your daily free theory.",
    image: "/features/screenshot-1779446043467.png",
    color: "#10b981",
  },
  {
    title: "Reading View",
    badge: "Learn",
    desc: "Dive deep into each mental model with rich reading content, text-to-speech narration, and word-level highlighting.",
    image: "/features/image%202.png",
    color: "#8b5cf6",
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
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#fb923c]">
            Preview
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl text-white/80">
            Take a look{" "}
            <span className="text-[#fb923c]">inside</span>
          </h2>
          <p className="mt-3 text-lg text-white/50">
            A first look at your future dashboard — your command center with progress tracking, a library of mental models, daily bite-sized lessons, personal insights on your growth, and a community of fellow thinkers.
          </p>
        </motion.div>

        <div className="space-y-20">
          {pages.map((page, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="overflow-hidden rounded-xl px-2.5 transition-transform duration-500 hover:scale-[1.02]" style={{ boxShadow: `-2px 0 0 0 ${page.color}40, 2px 0 0 0 ${page.color}40` }}>
                  <img src={page.image} alt={page.title} className="w-full" />
              </div>
              <div className="mt-5 px-1">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-6" style={{ backgroundColor: page.color }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: page.color }}>
                    {page.badge}
                  </span>
                </div>
                <div className="ml-9">
                  <h3 className="font-heading text-xl font-black tracking-[-0.02em] text-white/90">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {page.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
