import { useState, useEffect } from "react"
import { LogOut, Users, MessageSquare, Loader2 } from "lucide-react"
import { getWaitlist, getFeedbackList, getWaitlistCount, getFeedbackCount, type WaitlistEntry, type FeedbackEntry } from "./api"

type Tab = "waitlist" | "feedback"

const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
  { key: "waitlist", label: "Waitlist", icon: Users },
  { key: "feedback", label: "Feedback", icon: MessageSquare },
]

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("waitlist")
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [wl, wc, fc] = await Promise.all([
          getWaitlist(token),
          getWaitlistCount(token),
          getFeedbackCount(token),
        ])
        setWaitlist(wl)
        setWaitlistCount(wc.count)
        setFeedbackCount(fc.count)
      } catch (err) {
        console.error("Failed to load initial data:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  useEffect(() => {
    async function loadTab() {
      setFetching(true)
      try {
        if (tab === "feedback") {
          setFeedback(await getFeedbackList(token))
        }
      } catch (err) {
        console.error("Failed to load tab data:", err)
      } finally {
        setFetching(false)
      }
    }
    if (tab !== "waitlist") loadTab()
  }, [tab, token])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-black">
              S
            </div>
            <span className="text-sm font-bold">1section</span>
            <span className="ml-2 text-xs text-[#525252]">Admin</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-[#737373] transition-colors hover:text-white"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <StatCard icon={Users} label="Waitlist" value={waitlistCount} />
          <StatCard icon={MessageSquare} label="Feedback" value={feedbackCount} />
        </div>

        <div className="mb-6 flex gap-2 border-b border-white/10">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active
                    ? "border-white text-white"
                    : "border-transparent text-[#525252] hover:text-[#a3a3a3]"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            )
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#525252]" />
          </div>
        ) : (
          <div className="min-h-[400px]">
            {tab === "waitlist" && <WaitlistTable data={waitlist} />}
            {tab === "feedback" && (
              fetching ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-6 w-6 animate-spin text-[#525252]" />
                </div>
              ) : (
                <FeedbackTable data={feedback} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
      <div className="mb-1 flex items-center gap-2 text-xs text-[#525252]">
        <Icon size={14} />
        {label}
      </div>
      <p className="font-heading text-2xl font-black text-white">{value}</p>
    </div>
  )
}

function WaitlistTable({ data }: { data: WaitlistEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-[#525252]">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-12 text-center text-[#525252]">No entries yet</td>
            </tr>
          ) : (
            data.map((entry) => (
              <tr key={entry.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {entry.picture ? (
                      <img src={entry.picture} alt="" className="h-7 w-7 rounded-full" />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-[#737373]">
                        {entry.name?.[0] ?? "?"}
                      </div>
                    )}
                    <span className="text-white">{entry.name || "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#a3a3a3]">{entry.email}</td>
                <td className="px-4 py-3 text-[#525252]">{timeAgo(entry.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function FeedbackTable({ data }: { data: FeedbackEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-[#525252]">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Suggestion</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-12 text-center text-[#525252]">No feedback yet</td>
            </tr>
          ) : (
            data.map((entry) => (
              <tr key={entry.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-white">{entry.name || "Anonymous"}</td>
                <td className="px-4 py-3 text-[#a3a3a3] max-w-md truncate">{entry.suggestion}</td>
                <td className="px-4 py-3 text-[#525252]">{timeAgo(entry.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
