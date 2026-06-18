import { Request } from "express"

export interface GoogleTokenPayload {
  sub: string
  email: string
  name: string
  picture: string
}

export interface AuthRequest extends Request {
  user?: GoogleTokenPayload
}

export interface WaitlistBody {
  googleToken: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  error?: string
}
