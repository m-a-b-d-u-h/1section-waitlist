import express from "express"
import cors from "cors"
import helmet from "helmet"
import { config } from "./config"
import { errorHandler } from "./middleware/errorHandler"
import authRoutes from "./routes/auth"
import waitlistRoutes from "./routes/waitlist"
import analyticsRoutes from "./routes/analytics"
import feedbackRoutes from "./routes/feedback"

const app = express()

app.use(helmet())
app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use("/api/auth", authRoutes)
app.use("/api/waitlist", waitlistRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/feedback", feedbackRoutes)

app.use(errorHandler)

export default app
