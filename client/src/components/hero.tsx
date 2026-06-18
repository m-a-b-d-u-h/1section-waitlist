"use client"

import { motion } from "framer-motion"
import { useGoogleLogin } from "@react-oauth/google"
import { ChevronDown, ArrowRight, Check } from "lucide-react"
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

export default function Hero() {
  const { user, setUser } = useAuth()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token

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
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "48px 48px" }} />
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wider text-[#a3a3a3]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#a3a3a3]" />
            A thinking library for the curious mind
          </div>

          <h1 className="font-heading text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
            Master your{" "}
            <span className="text-[#a3a3a3]">thinking</span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#737373] sm:text-lg">
            Explore 200+ mental models, audio lessons, and interactive knowledge
            graphs. Learn how the world&apos;s top thinkers make decisions.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            {user ? (
              <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3">
                {user.picture ? (
                  <img src={user.picture} alt="" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-bold text-[#a3a3a3]">
                    {user.name[0]}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="flex items-center gap-1 text-xs text-[#a3a3a3]">
                    <Check size={10} />
                    On the waitlist
                  </p>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => login()}
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#e5e5e5]"
                >
                  <GoogleLogo />
                  Join Waitlist with Google
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-xs text-[#525252]">No password needed</span>
              </>
            )}
          </div>

          <div className="mt-12 flex items-center gap-8 text-xs text-[#525252]">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-white/20 bg-white/5" />
              200+ models
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-white/20 bg-white/5" />
              22 categories
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-white/20 bg-white/5" />
              Audio lessons
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#525252] transition-colors hover:text-white"
      >
        <span>Explore the library</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
