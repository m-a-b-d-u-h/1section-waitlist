"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
    avatar: "SC",
    color: "#a3a3a3",
    text: "1section has completely changed how I approach problem-solving. The mental models are incredibly practical and the knowledge graph shows how everything connects.",
  },
  {
    name: "Marcus Webb",
    role: "Startup Founder",
    avatar: "MW",
    color: "#a3a3a3",
    text: "I finally understand the frameworks that took years to learn. The interactive path makes it stick. Worth every penny.",
  },
  {
    name: "Elena Rodriguez",
    role: "Software Engineer at Google",
    avatar: "ER",
    color: "#a3a3a3",
    text: "The knowledge graph feature is brilliant. It shows how everything connects. I use it daily to map out complex systems before writing code.",
  },
  {
    name: "James Liu",
    role: "Strategy Consultant",
    avatar: "JL",
    color: "#a3a3a3",
    text: "My clients are amazed at how quickly I break down complex problems now. The mental models have become my secret weapon.",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#525252]">
            Testimonials
          </p>
          <h2 className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            What Learners{" "}
            <span className="text-[#444]">Say</span>
          </h2>
          <p className="mt-3 text-lg text-[#a3a3a3]">
            Join thousands who have transformed their thinking.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-[#050505] p-8 transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5"
            >
              <Quote size={24} className="mb-4 text-[#1a1a1a]" />
              <p className="mb-6 text-sm leading-relaxed text-[#a3a3a3]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: `${t.color}15`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[#525252]">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} fill="#a3a3a3" color="#a3a3a3" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
