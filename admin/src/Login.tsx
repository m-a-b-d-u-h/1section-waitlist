import { useState } from "react"
import { LogIn, Eye, EyeOff } from "lucide-react"

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "mabduh" && password === "mabduh") {
      onLogin(btoa(`${username}:${password}`))
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303]">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#050505] p-8 shadow-xl shadow-white/5"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img src="/favicon.svg" alt="1section" className="h-8 w-auto" />
          </div>
          <h1 className="font-heading text-2xl font-black text-white">1section</h1>
          <p className="mt-1 text-sm text-[#525252]">Admin Dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError("") }}
              className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-sm text-white placeholder:text-[#525252] outline-none transition-colors focus:border-white/20"
            />
          </div>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError("") }}
              className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 pr-10 text-sm text-white placeholder:text-[#525252] outline-none transition-colors focus:border-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525252] transition-colors hover:text-white"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-center text-xs text-red-400">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-[#e5e5e5] hover:shadow-lg hover:shadow-white/20"
        >
          <LogIn size={16} />
          Sign In
        </button>
      </form>
    </div>
  )
}
