import { Router } from "express"
import { trackVisit, getAnalytics } from "../controllers/analytics"

const router = Router()

router.post("/track", trackVisit)
router.get("/", getAnalytics)

export default router
