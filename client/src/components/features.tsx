import { Map, Waypoints, Brain } from "lucide-react"

const steps = [
  {
    icon: Map,
    title: "Pick a Path",
    desc: "Choose a topic and enter an interactive learning map. Each map is a curated path of connected nodes — designed to take you from zero to fluent.",
    features: [
      "Curated learning paths",
      "Visual node-based maps",
      "Connected topic networks",
      "Pick up where you left off",
    ],
    color: "#3b82f6",
  },
  {
    icon: Waypoints,
    title: "Walk the Nodes",
    desc: "Each node packs a short lesson, audio narration, quiz, reflection prompt, and action step — so every session is complete and hands-on.",
    features: [
      "Short & focused lessons",
      "Audio for on-the-go learning",
      "Quizzes to lock it in",
      "Reflections & action steps",
    ],
    color: "#10b981",
  },
  {
    icon: Brain,
    title: "Connect & Apply",
    desc: "See how mental models link together as you progress. Build a lattice of interconnected ideas — and start thinking like the best.",
    features: [
      "Visual node connections",
      "Cross-model linking",
      "Real-world application guides",
      "Track your thinking growth",
    ],
    color: "#8b5cf6",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#f97316]">
            How It Works
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl text-white">
            Learn Through{" "}
            <span className="text-[#f97316]">Interactive Maps</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/40">
            Each topic is a learning path. Each path is a map of connected nodes — with short lessons, audio, quizzes, and action steps.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#050505] p-6">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: step.color }}>
                  Step 0{i + 1}
                </div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]" style={{ color: step.color }}>
                  <Icon className="h-7 w-7" />
                </div>
                    <h3 className="font-heading mb-3 text-2xl font-black text-white/80">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
                <ul className="space-y-2">
                  {step.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/30">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: step.color, opacity: 0.5 }} />
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
