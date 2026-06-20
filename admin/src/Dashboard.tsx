import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { LogOut, Users, MessageSquare, RefreshCw, Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { getWaitlist, getFeedbackList, getWaitlistCount, getFeedbackCount, type WaitlistEntry } from "./api"

type Tab = "waitlist" | "feedback"

const PAGE_SIZE = 15

const tabs: { key: Tab; label: string }[] = [
  { key: "waitlist", label: "Waitlist" },
  { key: "feedback", label: "Feedback" },
]

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function groupByDate(data: WaitlistEntry[]) {
  const groups: Record<string, number> = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    groups[key] = 0
  }
  for (const entry of data) {
    const d = new Date(entry.createdAt)
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays >= 0 && diffDays < 7) {
      const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      if (groups[key] !== undefined) groups[key]++
    }
  }
  return Object.entries(groups).map(([date, count]) => ({ date, count }))
}

function SkeletonRows({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="border-b border-white/5">
          <td className="px-4 py-3"><div className="h-4 w-28 animate-pulse rounded bg-white/5" /></td>
          <td className="px-4 py-3"><div className="h-4 w-40 animate-pulse rounded bg-white/5" /></td>
          <td className="px-4 py-3"><div className="h-4 w-12 animate-pulse rounded bg-white/5" /></td>
        </tr>
      ))}
    </>
  )
}

export default function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("waitlist")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [activeBar, setActiveBar] = useState(-1)

  const waitlistQuery = useQuery({
    queryKey: ["waitlist", token],
    queryFn: () => getWaitlist(token),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const waitlistCountQuery = useQuery({
    queryKey: ["waitlistCount", token],
    queryFn: () => getWaitlistCount(token),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const feedbackCountQuery = useQuery({
    queryKey: ["feedbackCount", token],
    queryFn: () => getFeedbackCount(token),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const feedbackQuery = useQuery({
    queryKey: ["feedback", token],
    queryFn: () => getFeedbackList(token),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: tab === "feedback",
  })

  const loading = waitlistQuery.isLoading || waitlistCountQuery.isLoading || feedbackCountQuery.isLoading
  const fetching = waitlistQuery.isFetching || feedbackQuery.isFetching

  const handleRefresh = () => {
    waitlistQuery.refetch()
    waitlistCountQuery.refetch()
    feedbackCountQuery.refetch()
    if (tab === "feedback") feedbackQuery.refetch()
  }

  const chartData = useMemo(
    () => groupByDate(waitlistQuery.data ?? []),
    [waitlistQuery.data]
  )

  const filteredWaitlist = useMemo(() => {
    const data = waitlistQuery.data ?? []
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (e) => e.name?.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
    )
  }, [waitlistQuery.data, search])

  const filteredFeedback = useMemo(() => {
    const data = feedbackQuery.data ?? []
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (e) => e.name?.toLowerCase().includes(q) || e.suggestion.toLowerCase().includes(q)
    )
  }, [feedbackQuery.data, search])

  const totalPages = Math.max(1, Math.ceil(filteredWaitlist.length / PAGE_SIZE))
  const pagedWaitlist = filteredWaitlist.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.015),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
      </div>

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#030303]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="1section" className="h-6 w-auto" />
            <span className="text-xs text-[#737373] font-mono">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-[#737373] transition-colors hover:text-white"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#050505] to-black p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
              <div className="mb-1 flex items-center gap-2 text-xs text-[#737373]">
                <Users size={13} />
                Total Signups
              </div>
              <p className="font-heading text-3xl font-black text-white">
                {(waitlistCountQuery.data?.count ?? 0).toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#050505] to-black p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
              <div className="mb-1 flex items-center gap-2 text-xs text-[#737373]">
                <MessageSquare size={13} />
                Feedback
              </div>
              <p className="font-heading text-3xl font-black text-white">
                {(feedbackCountQuery.data?.count ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

        <div className="mb-6 rounded-xl border border-white/10 bg-gradient-to-br from-[#050505] to-black p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
          <div className="mb-3 flex items-center gap-2 text-xs text-[#737373]">
            <Calendar size={13} />
            Signups (Last 7 Days)
          </div>
          {chartData.length > 0 ? (
            <div className="flex items-end gap-1.5 h-24">
              {chartData.map((d, idx) => {
                const max = Math.max(...chartData.map((x) => x.count), 1)
                const h = Math.max(4, (d.count / max) * 80)
                const show = activeBar === idx
                return (
                  <div
                    key={d.date}
                    className="group relative flex flex-1 flex-col items-center cursor-pointer"
                    onClick={() => setActiveBar(activeBar === idx ? -1 : idx)}
                  >
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-white/20 to-white/40 transition-all duration-300 hover:from-white/30 hover:to-white/60"
                      style={{ height: h }}
                    />
                    <span className="mt-1 text-[10px] text-[#737373]">{d.date.split(" ")[1]}</span>
                    <span className={`absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white transition-opacity ${
                      show ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                      {d.count}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-xs text-[#737373]">No signups this week yet</p>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-2">
            {tabs.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key); setPage(1); setSearch("") }}
                  className={`relative px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "text-white"
                      : "text-[#525252] hover:text-[#a3a3a3]"
                  }`}
                >
                  {t.label}
                  {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
                </button>
              )
            })}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={handleRefresh}
              disabled={fetching}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#737373] transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={12} className={fetching ? "animate-spin" : ""} />
            </button>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
              <input
                type="text"
                placeholder={tab === "waitlist" ? "Search by name or email..." : "Search by name or suggestion..."}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-56 rounded-lg border border-white/10 bg-[#050505] py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-[#737373] outline-none focus:border-white/20"
              />
            </div>
          </div>
        </div>

        <div className="min-h-[400px]">
          {tab === "waitlist" ? (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-widest text-[#737373]">
                    <th className="px-4 py-3 font-medium w-10">#</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <SkeletonRows />
                  ) : pagedWaitlist.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Users size={24} className="text-[#525252]" />
                          <p className="text-sm text-[#737373]">{search ? "No results found" : "No entries yet"}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pagedWaitlist.map((entry, i) => (
                      <tr key={entry.id} className="group border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-[#525252] text-xs font-mono">{(page - 1) * PAGE_SIZE + i + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            {entry.picture ? (
                              <img src={entry.picture} alt="" className="h-7 w-7 rounded-full ring-1 ring-white/10" />
                            ) : (
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-[#737373] ring-1 ring-white/10">
                                {entry.name?.[0] ?? "?"}
          </div>
                            )}
                            <span className="text-white">{entry.name || "—"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#a3a3a3]">{entry.email}</td>
                        <td className="px-4 py-3 text-[#737373] hidden sm:table-cell" title={formatDate(entry.createdAt)}>{timeAgo(entry.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                  <span className="text-xs text-[#737373]">Page {page} of {totalPages}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="rounded-lg border border-white/10 p-1.5 text-[#737373] transition-colors hover:border-white/20 hover:text-white disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="rounded-lg border border-white/10 p-1.5 text-[#737373] transition-colors hover:border-white/20 hover:text-white disabled:opacity-30"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-widest text-[#737373]">
                    <th className="px-4 py-3 font-medium w-10">#</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Suggestion</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackQuery.isLoading ? (
                    <SkeletonRows />
                  ) : filteredFeedback.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <MessageSquare size={24} className="text-[#737373]" />
                          <p className="text-sm text-[#737373]">{search ? "No results found" : "No feedback yet"}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    (filteredFeedback).map((entry, i) => (
                      <tr key={entry.id} className="group border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-[#525252] text-xs font-mono">{i + 1}</td>
                        <td className="px-4 py-3">
                          <span className="text-white">{entry.name || "Anonymous"}</span>
                        </td>
                        <td className="px-4 py-3 text-[#a3a3a3] max-w-md truncate">{entry.suggestion}</td>
                        <td className="px-4 py-3 text-[#525252] hidden sm:table-cell" title={formatDate(entry.createdAt)}>{timeAgo(entry.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
