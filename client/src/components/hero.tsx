"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useGoogleLogin } from "@react-oauth/google"
import { ArrowRight, Check } from "lucide-react"
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

function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let instance: any = null
    const init = async () => {
      const mod: any = await import("three")
      const THREE = mod.default || mod
      ;(window as any).THREE = THREE
      const NET = (await import("vanta/dist/vanta.net.min")).default
      if (ref.current && !instance) {
        instance = NET({
          el: ref.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0x737373,
          backgroundColor: 0x000000,
          points: 5,
          maxDistance: 40,
          spacing: 35,
          showDots: true,
        })
        setTimeout(() => {
          setReady(true)
          try {
            instance.points?.forEach((p: any) => p.scale.set(80, 80, 80))
          } catch {}
        }, 500)
      }
    }
    init()
    return () => {
      instance?.destroy()
    }
  }, [])

  return (
    <>
      <div ref={ref} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: ready ? 0.4 : 0 }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#000_75%)] pointer-events-none" />
    </>
  )
}

export default function Hero() {
  const { user, setUser } = useAuth()
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [members, setMembers] = useState<{ name: string; picture: string }[]>([])

  useEffect(() => {
    fetch(`${API}/api/waitlist/count`)
      .then((r) => r.json())
      .then((d) => d.data?.count && setTotalCount(d.data.count))
      .catch(() => {})
    fetch(`${API}/api/waitlist/recent`)
      .then((r) => r.json())
      .then((d) => d.data && setMembers(d.data))
      .catch(() => {})
  }, [])

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
    <section className="relative min-h-screen overflow-hidden bg-black">
      <VantaBackground />

      <div className="relative mx-auto flex min-h-screen max-w-[900px] flex-col items-center justify-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wider text-[#a3a3a3]"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#a3a3a3] animate-pulse" />
          Interactive learning maps
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl"
        >
          Master how the{" "}
          <span className="text-[#a3a3a3]">world works</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-[#737373] sm:text-lg"
        >
            Mental models are the shortcut. Learn them through interactive
            maps, connected nodes, short lessons, audio, quizzes, and actions
            — the fastest way to understand how everything fits together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          {user ? (
            <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3">
              {user.picture ? (
                <img src={user.picture} alt="" referrerPolicy="no-referrer" className="h-9 w-9 rounded-full" />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-bold text-[#a3a3a3]">
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
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#e5e5e5] hover:shadow-xl hover:shadow-white/20"
              >
                <GoogleLogo />
                Get Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-[#525252]">No password needed · Free access</span>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-2 text-xs text-[#525252]"
        >
          <div className="flex -space-x-1.5">
            {members.length > 0 ? members.slice(0, 4).map((m, i) => (
              m.picture ? (
                <img key={i} src={m.picture} alt="" referrerPolicy="no-referrer" className="h-5 w-5 rounded-full border border-black/20" />
              ) : (
                <div key={i} className="h-5 w-5 rounded-full border border-black/20 bg-white/10 flex items-center justify-center text-[8px] font-medium text-[#737373]">
                  {m.name?.[0] ?? "?"}
                </div>
              )
            )) : [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 w-5 rounded-full border border-black/20 bg-white/5" />
            ))}
          </div>
          <span>
            Trusted by <span className="text-[#a3a3a3]">{totalCount ?? 0}+</span> early adopters
          </span>
        </motion.div>

        <motion.a
          href="#preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#525252] transition-colors hover:text-white"
        >
          <span>Explore the library</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}
