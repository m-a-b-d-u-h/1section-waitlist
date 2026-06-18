"use client"

import { useEffect } from "react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export default function VisitTracker() {
  useEffect(() => {
    const key = "1section_last_track"
    const last = sessionStorage.getItem(key)
    const now = Date.now()

    if (last && now - Number(last) < 5000) return
    sessionStorage.setItem(key, String(now))

    fetch(`${API}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: crypto.randomUUID(),
        device: navigator.userAgent,
      }),
    }).catch(() => {})
  }, [])

  return null
}
