import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { authCallback, getMe } from "../controllers/authController";

const router = Router()

router.use(protectRoute)

router.get("/me", getMe)
router.post("/callback", authCallback)

export default router