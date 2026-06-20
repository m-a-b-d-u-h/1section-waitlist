import { Router } from "express"
import { joinWaitlist, getWaitlistCount, getRecentMembers, getPosition, getAllWaitlist } from "../controllers/waitlist"
import { verifyGoogleToken } from "../middleware/auth"
import { adminAuth } from "../middleware/admin"

const router = Router()

router.post("/", verifyGoogleToken, joinWaitlist)
router.get("/count", getWaitlistCount)
router.get("/recent", getRecentMembers)
router.get("/position", verifyGoogleToken, getPosition)
router.get("/all", adminAuth, getAllWaitlist)

export default router
