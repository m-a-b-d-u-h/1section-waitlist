import { Response, NextFunction } from "express"
import prisma from "../prisma/client"
import { AuthRequest } from "../types"
import { sendSuccess, sendError } from "../utils/helpers"
import { sendConfirmationEmail } from "../utils/mail"

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
      const position = await prisma.waitlist.count({
        where: { createdAt: { lte: existing.createdAt } },
      })
      return sendSuccess(res, { ...existing, position }, "Already on the waitlist")
    }

    const entry = await prisma.waitlist.create({
      data: {
        googleId: req.user.sub,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
      },
    })

    const position = await prisma.waitlist.count({
      where: { createdAt: { lte: entry.createdAt } },
    })

    await sendConfirmationEmail(entry.email, entry.name, position)

    sendSuccess(res, { ...entry, position }, "Successfully joined the waitlist", 201)
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

export async function getPosition(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.email) {
      return sendError(res, "Unauthorized", 401)
    }

    const entry = await prisma.waitlist.findUnique({
      where: { email: req.user.email },
    })

    if (!entry) {
      return sendError(res, "Not on the waitlist", 404)
    }

    const position = await prisma.waitlist.count({
      where: { createdAt: { lte: entry.createdAt } },
    })

    sendSuccess(res, { position, total: await prisma.waitlist.count() })
  } catch (err) {
    next(err)
  }
}

export async function getAllWaitlist(
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const entries = await prisma.waitlist.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, googleId: true, email: true, name: true, picture: true, createdAt: true },
    })
    sendSuccess(res, entries)
  } catch (err) {
    next(err)
  }
}

export async function getRecentMembers(
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const members = await prisma.waitlist.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { name: true, picture: true },
    })
    sendSuccess(res, members)
  } catch (err) {
    next(err)
  }
}
