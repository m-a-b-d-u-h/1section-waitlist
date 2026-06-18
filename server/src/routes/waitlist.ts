import { Router } from "express"
import { joinWaitlist, getWaitlistCount, getRecentMembers } from "../controllers/waitlist"
import { verifyGoogleToken } from "../middleware/auth"

const router = Router()

router.post("/", verifyGoogleToken, joinWaitlist)
router.get("/count", getWaitlistCount)
router.get("/recent", getRecentMembers)

export default router
