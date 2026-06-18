import { Response, NextFunction } from "express"
import prisma from "../prisma/client"
import { AuthRequest } from "../types"
import { sendSuccess, sendError } from "../utils/helpers"

export async function joinWaitlist(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return sendError(res, "Unauthorized", 401)
    }

    const existing = await prisma.waitlist.findUnique({
      where: { email: req.user.email },
    })

    if (existing) {
      return sendSuccess(res, existing, "Already on the waitlist")
    }

    const entry = await prisma.waitlist.create({
      data: {
        googleId: req.user.sub,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
      },
    })

    sendSuccess(res, entry, "Successfully joined the waitlist", 201)
  } catch (err) {
    next(err)
  }
}

export async function getWaitlistCount(
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const count = await prisma.waitlist.count()
    sendSuccess(res, { count })
  } catch (err) {
    next(err)
  }
}
