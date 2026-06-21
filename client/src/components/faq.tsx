"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#fb923c]">
            FAQ
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl text-white/80">
            Frequently Asked{" "}
            <span className="text-[#fb923c]">Questions</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/40">
            Everything you need to know about 1section.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#050505] transition-colors duration-200 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-heading text-base font-bold text-white/80">
                      {faq.q}
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] transition-colors duration-200">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="relative h-3 w-3"
                      >
                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
                        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />
                      </motion.div>
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-white/5 mb-4" />
                        <p className="text-sm leading-relaxed text-white/40">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
