import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../models/User";
import { requireAuth } from "@clerk/express";

export type AuthRequest = Request & {
  userId?: string;
};

export const protectRoute = [
    requireAuth(),
    async(req: AuthRequest, res: Response, next: NextFunction)=>{

    try{
        const {userId: clerkId, sessionClaims} = getAuth(req)

        const user = await User.findOneAndUpdate(
          { clerkId },
          {
            $setOnInsert: {
              clerkId,
              name: sessionClaims?.fullName || "User",
              email: sessionClaims?.email || "",
              avatar: sessionClaims?.imageUrl || "",
            }
          },
          { upsert: true, new: true }
        )

        req.userId = user._id.toString();
        next()
    }catch(error){
        res.status(500);
        next(error)
    }
}
]