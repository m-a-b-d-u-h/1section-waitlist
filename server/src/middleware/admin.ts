import { Response, NextFunction } from "express"
import { AuthRequest } from "../types"
import { config } from "../config"

export function adminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Basic ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  try {
    const decoded = Buffer.from(header.replace("Basic ", ""), "base64").toString("utf-8")
    const [user, pass] = decoded.split(":")
    if (user !== config.adminUsername || pass !== config.adminPassword) {
      return res.status(401).json({ success: false, error: "Invalid credentials" })
    }
    next()
  } catch {
    return res.status(401).json({ success: false, error: "Invalid authorization" })
  }
}
