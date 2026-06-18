import { Response, NextFunction } from "express"
import { OAuth2Client } from "google-auth-library"
import { config } from "../config"
import { AuthRequest, GoogleTokenPayload } from "../types"
import { sendError } from "../utils/helpers"

const googleClient = new OAuth2Client(config.google.clientId)

async function verifyAccessToken(token: string): Promise<GoogleTokenPayload> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Invalid access token")
      const data = (await res.json()) as Record<string, unknown>
      return {
        sub: data.sub as string,
        email: data.email as string,
        name: (data.name as string) || "",
        picture: (data.picture as string) || "",
      }
}

export async function verifyGoogleToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      return sendError(res, "Missing authorization token", 401)
    }

    // Try as Google ID token first
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: config.google.clientId,
      })
      const payload = ticket.getPayload()
      if (!payload) throw new Error("Invalid ID token")
      req.user = {
        sub: payload.sub!,
        email: payload.email!,
        name: payload.name || "",
        picture: payload.picture || "",
      }
      return next()
    } catch {
      // Fallback: verify as OAuth access token
      req.user = await verifyAccessToken(token)
      next()
    }
  } catch {
    sendError(res, "Invalid or expired token", 401)
  }
}

export { verifyAccessToken }
