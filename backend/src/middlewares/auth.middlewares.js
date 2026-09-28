import { getAuth } from "@clerk/express";
import User from "../models/users.models.js";

export async function protectRoute(req, res, next) {
    try {

        let { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        let user = await User.findOne({ clerkId: userId })

        if (!user) {
            res.status(404).json({ message: "User profile is not synced yet!!!" });
            return;
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(`ERROR IN protectRoute MIDDLEWARE ${e}`)
        res.status(500).json({ message: "Internal server error" })
    }

}