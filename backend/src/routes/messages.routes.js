import express from "express";
import {
    getconversationsForSidebar,
    getMessages,
    getUserForSidebar,
    sendMessages,
} from "../controllers/messages.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import {upload} from "../middlewares/upload.middlewares.js"

let router = express.Router();

router.use(protectRoute);

router.get("/users", getUserForSidebar);
router.get("/conversations", getconversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id",upload.single("media"), sendMessages);

export default router;
