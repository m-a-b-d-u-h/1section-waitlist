import { Response } from "express"
import { ApiResponse } from "../types"

export function sendSuccess<T>(res: Response, data: T, message?: string, status = 200) {
  const response: ApiResponse<T> = { success: true, data }
  if (message) response.message = message
  res.status(status).json(response)
}

export function sendError(res: Response, error: string, status = 400) {
  const response: ApiResponse = { success: false, error }
  res.status(status).json(response)
}
