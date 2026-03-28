import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { authCallback, getMe } from "../controllers/authController";
import { requireAuth } from "@clerk/express";
const router = Router()

router.get("/me",protectRoute, getMe)
router.post("/callback",requireAuth (), authCallback)

export default router