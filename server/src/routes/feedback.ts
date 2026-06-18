import { Router } from "express"
import { submitFeedback, getFeedbackCount } from "../controllers/feedback"

const router = Router()

router.post("/", submitFeedback)
router.get("/count", getFeedbackCount)

export default router
