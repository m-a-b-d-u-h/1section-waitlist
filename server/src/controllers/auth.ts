import { Response, NextFunction } from "express"
import { OAuth2Client } from "google-auth-library"
import { config } from "../config"
import { AuthRequest } from "../types"
import { sendSuccess, sendError } from "../utils/helpers"
import { verifyAccessToken } from "../middleware/auth"

const googleClient = new OAuth2Client(config.google.clientId)

export async function loginWithGoogle(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { googleToken } = req.body

    if (!googleToken) {
      return sendError(res, "Google token is required")
    }

    // Try as ID token
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: config.google.clientId,
      })
      const payload = ticket.getPayload()
      if (!payload || !payload.sub || !payload.email) {
        return sendError(res, "Invalid Google token", 401)
      }
      return sendSuccess(res, { user: payload }, "Login successful")
    } catch {
      // Try as access token
      const user = await verifyAccessToken(googleToken)
      return sendSuccess(res, { user }, "Login successful")
    }
  } catch (err) {
    next(err)
  }
}
