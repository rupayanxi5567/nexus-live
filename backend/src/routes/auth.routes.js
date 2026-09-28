import express from "express"
import { checkAuth } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

let router = express.Router();

router.get("/check", protectRoute, checkAuth);

// let authRoutes = 

export default router;