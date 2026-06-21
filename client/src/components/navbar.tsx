"use client"

import { useState } from "react"
import Link from "next/link"
import { Ellipsis, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Preview", href: "#preview" },
  { label: "Features", href: "#features" },
  { label: "Analysis", href: "#analysis" },
  { label: "Feedback", href: "#feedback" },
  { label: "FAQ", href: "#faq" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
      <div className="relative mx-auto flex h-14 sm:h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="1section" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90"
          >
            Join Waitlist
          </a>
        </nav>

        <button
          className="relative z-10 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Ellipsis className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden bg-black/95 backdrop-blur-2xl transition-all duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-black"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
