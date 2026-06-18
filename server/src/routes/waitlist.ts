import { Router } from "express"
import { joinWaitlist, getWaitlistCount } from "../controllers/waitlist"
import { verifyGoogleToken } from "../middleware/auth"

const router = Router()

router.post("/", verifyGoogleToken, joinWaitlist)
router.get("/count", getWaitlistCount)

export default router
