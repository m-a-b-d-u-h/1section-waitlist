import Link from "next/link"

const linkGroups = [
  {
    title: "Library",
    links: [
      { label: "Mental Models", href: "#" },
      { label: "Categories", href: "#" },
      { label: "Daily Free", href: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Preview", href: "#preview" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X (Twitter)", href: "https://x.com/1section_com" },
      { label: "GitHub", href: "https://github.com/1section_com" },
      { label: "LinkedIn", href: "https://linkedin.com/company/1section_com" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-black">
                S
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">1section</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#737373] max-w-xs">
              A thinking library of mental models, audio lessons, and knowledge
              graphs.
            </p>
            <p className="text-xs text-[#525252]">
              Master your thinking library.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-[#525252]">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#737373] transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-[#525252]">
          &copy; {new Date().getFullYear()} 1section. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
