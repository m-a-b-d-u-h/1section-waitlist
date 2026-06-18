import { Request, Response, NextFunction } from "express"
import prisma from "../prisma/client"
import { sendSuccess } from "../utils/helpers"

export async function trackVisit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { visitorId, device, browser, country } = req.body

    await prisma.analytics.create({
      data: {
        page: req.path || "/",
        visitorId: visitorId || null,
        device: device || null,
        browser: browser || null,
        country: country || null,
      },
    })

    sendSuccess(res, null, "Visit tracked", 201)
  } catch (err) {
    next(err)
  }
}

export async function getAnalytics(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [totalVisitors, waitlistUsers] = await Promise.all([
      prisma.analytics.count(),
      prisma.waitlist.count(),
    ])

    sendSuccess(res, {
      totalVisitors,
      waitlistUsers,
    })
  } catch (err) {
    next(err)
  }
}
