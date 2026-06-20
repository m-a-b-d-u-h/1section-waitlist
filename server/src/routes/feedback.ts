import { Router } from "express"
import { submitFeedback, getFeedbackCount, getAllFeedback } from "../controllers/feedback"
import { adminAuth } from "../middleware/admin"

const router = Router()

router.post("/", submitFeedback)
router.get("/count", getFeedbackCount)
router.get("/all", adminAuth, getAllFeedback)

export default router
