import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { config } from "./config"
import { errorHandler } from "./middleware/errorHandler"
import authRoutes from "./routes/auth"
import waitlistRoutes from "./routes/waitlist"
import feedbackRoutes from "./routes/feedback"

const app = express()

app.use(helmet())
app.use(cors({ origin: [config.clientUrl, config.adminUrl], credentials: true }))
app.use(express.json())

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
})

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
})

app.use("/api/waitlist", generalLimiter)
app.use("/api/feedback", generalLimiter)
app.use("/api/waitlist", (req, _res, next) => {
  if (req.method === "POST") return writeLimiter(req, _res, next)
  next()
})
app.use("/api/feedback", (req, _res, next) => {
  if (req.method === "POST") return writeLimiter(req, _res, next)
  next()
})

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
})

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use("/api/auth", authLimiter, authRoutes)
app.use("/api/waitlist", waitlistRoutes)
app.use("/api/feedback", feedbackRoutes)

app.use(errorHandler)

export default app
