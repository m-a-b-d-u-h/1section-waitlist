import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"

const TOKEN_KEY = "admin_token"
const queryClient = new QueryClient()

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))

  const handleLogin = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
  }

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    queryClient.clear()
    setToken(null)
  }

  if (!token) return <Login onLogin={handleLogin} />
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard token={token} onLogout={handleLogout} />
    </QueryClientProvider>
  )
}
