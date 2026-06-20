"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGoogleLogin } from "@react-oauth/google"
import { ArrowRight, Crown, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

async function joinWaitlist(accessToken: string) {
  const res = await fetch(`${API}/api/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.json()
}

export default function FinalCta() {
  const { user, setUser } = useAuth()
  const [position, setPosition] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("1section_access_token")
    if (!user || !token) return
    fetch(`${API}/api/waitlist/position`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => d.data?.position && setPosition(d.data.position))
      .catch(() => {})
  }, [user])

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token
        localStorage.setItem("1section_access_token", accessToken)

        const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const userData = await userRes.json()

        setUser({
          name: userData.name || userData.email,
          email: userData.email,
          picture: userData.picture || "",
        })

        await joinWaitlist(accessToken)
      } catch (err) {
        console.error("Login failed:", err)
      }
    },
    onError: () => console.error("Google login failed"),
  })

  return (
    <section id="waitlist" className="w-full py-32 sm:py-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#050505] to-black p-12 sm:p-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-[#a3a3a3]">
              {user ? <Check size={14} /> : <Crown size={14} />}
              <span className="text-xs font-bold uppercase tracking-wider">
                {user ? "You're on the list" : "Unlock Full Access"}
              </span>
            </div>

            <h2 className="font-heading mt-10 text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl">
              {user
                ? `You're in, ${user.name.split(" ")[0]}!`
                : "Ready to master your mind?"}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#737373] sm:text-lg">
              {user
                ? "We'll notify you when 1section launches. In the meantime, tell your friends about the waitlist."
                : "Join the waitlist and be the first to access the complete library of mental models, knowledge graphs, and learning tools."}
            </p>

            {user ? (
              <div className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4">
                {user.picture ? (
                  <img src={user.picture} alt="" referrerPolicy="no-referrer" className="h-12 w-12 rounded-full ring-2 ring-white/10" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-base font-bold text-[#a3a3a3] ring-2 ring-white/10">
                    {user.name[0]}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-base font-semibold text-white">{user.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-[#a3a3a3]">
                    <Check size={12} />
                    {position ? `#${position} on the waitlist` : "Already on the waitlist"}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              >
                <button
                  onClick={() => login()}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-base font-semibold text-black transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-white/10"
                >
                  <GoogleLogo />
                  Join Waitlist with Google
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {!user && (
              <p className="mt-5 text-sm text-[#525252]">
                No password needed &middot; Get notified at launch &middot; No spam, ever
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
