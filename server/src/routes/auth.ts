import { Router } from "express"
import { loginWithGoogle } from "../controllers/auth"

const router = Router()

router.post("/google", loginWithGoogle)

export default router
