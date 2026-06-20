export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000"

export interface WaitlistEntry {
  id: string
  googleId: string
  email: string
  name: string | null
  picture: string | null
  createdAt: string
}

export interface FeedbackEntry {
  id: string
  name: string | null
  suggestion: string
  createdAt: string
}

export interface CountData {
  count: number
}

async function fetchApi<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Basic ${token}` },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  const json = await res.json()
  return json.data as T
}

export function getWaitlist(token: string) {
  return fetchApi<WaitlistEntry[]>("/api/waitlist/all", token)
}

export function getFeedbackList(token: string) {
  return fetchApi<FeedbackEntry[]>("/api/feedback/all", token)
}

export function getWaitlistCount(token: string) {
  return fetchApi<CountData>("/api/waitlist/count", token)
}

export function getFeedbackCount(token: string) {
  return fetchApi<CountData>("/api/feedback/count", token)
}
