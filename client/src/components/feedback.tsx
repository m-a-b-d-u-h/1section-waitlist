"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Send } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export default function Feedback() {
  const [name, setName] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${API}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || null, suggestion }),
      })
      setSubmitted(true)
    } catch {
      console.error("Failed to submit feedback")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="feedback" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-10 sm:p-16">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/[0.03] blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/[0.03] blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-black/20"
                style={{ background: "#ffffff10", border: "1px solid #ffffff20", color: "#fb923c" }}
              >
                <Lightbulb className="h-7 w-7" />
              </div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#fb923c]">
                Feedback
              </p>
              <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl text-white/80">
                Have a Feature{" "}
                <span className="text-[#fb923c]">Idea?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-white/40">
                Your feedback shapes 1section. Tell us what you&apos;d love to see.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.05]">
                  <Send className="h-6 w-6 text-white/25" />
                </div>
                <p className="font-heading text-lg font-bold">Thank you!</p>
                <p className="mt-1 text-sm text-white/40">
                  Your feedback has been received. Our team will review it.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setName("")
                    setSuggestion("")
                  }}
                  className="mt-6 text-sm text-white/30 underline-offset-4 hover:underline"
                >
                  Submit another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-lg space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#030303] px-5 py-3.5 text-sm text-white/90 placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell us your idea or suggestion..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#030303] px-5 py-3.5 text-sm text-white/90 placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-white/10 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Sending..." : "Send Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
