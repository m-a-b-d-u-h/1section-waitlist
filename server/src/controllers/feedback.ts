import { Request, Response, NextFunction } from "express"
import prisma from "../prisma/client"
import { sendSuccess, sendError } from "../utils/helpers"

export async function submitFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, suggestion } = req.body

    if (!suggestion || typeof suggestion !== "string" || !suggestion.trim()) {
      return sendError(res, "Suggestion is required", 400)
    }

    const feedback = await prisma.feedback.create({
      data: {
        name: name || null,
        suggestion: suggestion.trim(),
      },
    })

    sendSuccess(res, feedback, "Feedback submitted", 201)
  } catch (err) {
    next(err)
  }
}

export async function getFeedbackCount(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const count = await prisma.feedback.count()
    sendSuccess(res, { count })
  } catch (err) {
    next(err)
  }
}
