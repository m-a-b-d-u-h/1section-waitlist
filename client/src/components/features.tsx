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
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            How It Works
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            Three Simple{" "}
            <span className="text-[#525252]">Steps</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#a3a3a3]">
            Transform your thinking with a structured approach.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#050505] p-8">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-[#a3a3a3]">
                  Step 0{i + 1}
                </div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Icon className="h-7 w-7 text-[#a3a3a3]" />
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
                      <div className="h-1.5 w-1.5 rounded-full bg-[#a3a3a3]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
