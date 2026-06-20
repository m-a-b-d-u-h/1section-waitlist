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
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#050505] p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-black">
            S
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
              className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-sm text-white placeholder:text-[#525252] outline-none focus:border-white/20"
            />
          </div>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError("") }}
              className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 pr-10 text-sm text-white placeholder:text-[#525252] outline-none focus:border-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525252] hover:text-white"
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
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#e5e5e5]"
        >
          <LogIn size={16} />
          Sign In
        </button>
      </form>
    </div>
  )
}
