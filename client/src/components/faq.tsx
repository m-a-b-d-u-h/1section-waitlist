"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const faqs = [
  {
    q: "What makes 1section different from other learning platforms?",
    a: "1section focuses on mental models and cognitive frameworks rather than just information. Our interactive knowledge graph shows how concepts connect, and the implementation paths help you actually apply what you learn.",
  },
  {
    q: "How does the daily free theory work?",
    a: "Every 24 hours, we unlock a new professional framework for free. This gives you a taste of our premium content and helps you build a learning habit without any commitment.",
  },
  {
    q: "Can I access content offline?",
    a: "Yes! With our paid plans, you can download theories and listen to them offline. Perfect for commute learning or areas with limited connectivity.",
  },
  {
    q: "How does the knowledge graph work?",
    a: "As you progress through modules, they appear in your personal knowledge graph showing how different mental models connect. This helps you see the bigger picture and understand relationships between concepts.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied within the first 30 days, just reach out and we'll issue a full refund.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            FAQ
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            Frequently Asked{" "}
            <span className="text-[#525252]">Questions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full rounded-xl border p-6 text-left transition-all duration-200 ${
                    isOpen
                      ? "border-white/10 bg-white/5"
                      : "border-white/5 bg-[#0b0d14]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-heading text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        isOpen ? "bg-white/10" : "bg-white/5"
                      }`}
                    >
                      <div
                        className={`h-2.5 w-2.5 border-r-2 border-b-2 border-[#a3a3a3] transition-transform duration-200 ${
                          isOpen ? "rotate-[-135deg] mt-[-4px]" : "rotate-45"
                        }`}
                      />
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="-mt-px rounded-b-xl border border-white/5 border-t-0 bg-white/5 p-5"
                  >
                    <p className="text-sm leading-relaxed text-[#737373]">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
