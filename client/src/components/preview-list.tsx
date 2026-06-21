"use client"

import { motion } from "framer-motion"

interface PageMockupProps {
  title: string
  url: string
  children: React.ReactNode
}

function PageMockup({ title, url, children }: PageMockupProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#050505] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 border-b border-white/10 bg-black px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#525252]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#525252]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#525252]" />
        </div>
        <div className="flex-1 mx-4">
          <div className="mx-auto max-w-[200px] rounded-md bg-[#0a0a0a] px-3 py-1.5 text-center">
            <span className="text-xs text-[#525252]">{url}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

const pages = [
  {
    title: "Dashboard",
    url: "app.1section.com/dashboard",
    badge: "Dashboard",
    desc: "Your command center. See your progress, recommended modules, recent activity, and learning streaks at a glance.",
    color: "#a3a3a3",
    mockup: (
      <div className="aspect-video p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 h-4 w-32 rounded bg-white/5" />
            <div className="h-3 w-48 rounded bg-white/[0.03]" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-white/5" />
            <div className="h-8 w-8 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-1 h-6 w-12 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/5" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-1 h-6 w-12 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/5" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-1 h-6 w-12 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-2 h-3 w-24 rounded bg-white/5" />
            <div className="h-16 rounded bg-white/[0.03]" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-2 h-3 w-full rounded bg-white/[0.03]" />
            <div className="mb-2 h-3 w-3/4 rounded bg-white/[0.03]" />
            <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Explore Modules",
    url: "app.1section.com/models",
    badge: "Library",
    desc: "Browse the full collection of mental models. Filter by category, search by keyword, or discover your daily free theory.",
    mockup: (
      <div className="aspect-video p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-white/5" />
          </div>
        </div>
        <div className="mb-3 flex gap-2">
          {["All", "Mindset", "Clarity", "Habit", "Strategy"].map((tag) => (
            <div
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1"
            >
              <div className="h-2.5 w-12 rounded bg-white/5" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="mb-2 h-8 w-8 rounded-lg bg-white/5" />
              <div className="mb-1 h-3 w-20 rounded bg-white/5" />
              <div className="h-2 w-16 rounded bg-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Reading View",
    url: "app.1section.com/models/circle-of-influence",
    badge: "Learn",
    desc: "Dive deep into each mental model with rich reading content, text-to-speech narration, and word-level highlighting.",
    mockup: (
      <div className="aspect-video p-4 sm:p-6">
        <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="h-6 w-6 rounded bg-white/5" />
          <div className="h-3 w-40 rounded bg-white/5" />
          <div className="ml-auto flex gap-2">
            <div className="h-6 w-16 rounded bg-white/5" />
            <div className="h-6 w-16 rounded bg-white/5" />
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-2 h-4 w-3/4 rounded bg-white/5" />
          <div className="mb-1 h-3 w-full rounded bg-white/[0.03]" />
          <div className="mb-1 h-3 w-full rounded bg-white/[0.03]" />
          <div className="mb-1 h-3 w-5/6 rounded bg-white/[0.03]" />
          <div className="mb-3 h-3 w-2/3 rounded bg-white/[0.03]" />
          <div className="mb-1 h-3 w-full rounded bg-white/[0.03]" />
          <div className="mb-1 h-3 w-full rounded bg-white/[0.03]" />
          <div className="mb-1 h-3 w-4/5 rounded bg-white/[0.03]" />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2">
          <div className="h-6 w-6 rounded-full bg-white/10" />
          <div className="h-2 flex-1 rounded bg-white/5" />
          <div className="h-2 w-8 rounded bg-white/5" />
          <div className="h-2 w-8 rounded bg-white/5" />
        </div>
      </div>
    ),
  },
  {
    title: "Learning Path",
    url: "app.1section.com/path",
    badge: "Path",
    desc: "Follow structured learning paths that guide you through interconnected mental models, building mastery step by step.",
    mockup: (
      <div className="aspect-video p-4 sm:p-6">
        <div className="mb-4">
          <div className="mb-1 h-4 w-40 rounded bg-white/5" />
          <div className="h-3 w-56 rounded bg-white/[0.03]" />
        </div>
        <div className="relative flex items-center justify-center py-4">
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          <div className="relative space-y-6 w-full max-w-sm">
            {[
              { label: "Circle of Influence", done: true, color: "#a3a3a3" },
              { label: "Systems Thinking", done: true, color: "#a3a3a3" },
              { label: "Second-Order Effects", current: true, color: "#a3a3a3" },
              { label: "Leverage Points", color: "#525252" },
              { label: "Feedback Loops", color: "#525252" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    item.done
                      ? "border-[#a3a3a3] bg-[#a3a3a3]/20"
                      : item.current
                        ? "border-[#a3a3a3] bg-[#a3a3a3]/20"
                        : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.done
                        ? "bg-[#a3a3a3]"
                        : item.current
                          ? "bg-[#a3a3a3]"
                          : "bg-[#525252]"
                    }`}
                  />
                </div>
                <div className="h-3 flex-1 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Quiz",
    url: "app.1section.com/models/circle-of-influence/quiz",
    badge: "Quiz",
    desc: "Test your understanding with interactive quizzes. Review explanations, track scores, and earn XP for each correct answer.",
    mockup: (
      <div className="aspect-video p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-3 w-32 rounded bg-white/5" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-16 rounded bg-white/5" />
            <div className="h-4 w-4 rounded bg-white/10" />
          </div>
        </div>
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-3/5 rounded-full bg-[#a3a3a3]" />
        </div>
        <div className="mb-4 mt-4 h-4 w-3/4 rounded bg-white/5" />
        <div className="space-y-2">
          {[
            { label: "Answer A", color: "transparent" },
            { label: "Answer B", color: "transparent" },
            { label: "Answer C", color: "#a3a3a3" },
            { label: "Answer D", color: "transparent" },
          ].map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border px-4 py-3"
              style={{
                borderColor: opt.color || "rgba(255,255,255,0.05)",
                background: opt.color
                  ? `${opt.color}15`
                  : "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  borderColor: opt.color || "rgba(255,255,255,0.1)",
                  background: opt.color || "transparent",
                }}
              />
              <div className="h-3 flex-1 rounded bg-white/5" />
              {opt.color && (
                <div className="h-4 w-4 rounded-full bg-[#a3a3a3]/30 flex items-center justify-center">
                  <div className="h-2 w-1 rotate-45 border-b-2 border-r-2 border-[#a3a3a3]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
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
              <PageMockup title={page.title} url={page.url}>
                {page.mockup}
              </PageMockup>
              <div className="flex min-h-[160px] flex-col border-t border-white/10 p-5 sm:p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
                    style={{
                      color: page.color,
                      borderColor: `${page.color}40`,
                      background: `${page.color}15`,
                      borderWidth: 1,
                    }}
                  >
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
