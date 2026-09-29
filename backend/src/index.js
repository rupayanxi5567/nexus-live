import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";
import clerkWebHooks from "./webhooks/clerk.webhooks.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";

dns.setServers(["1.1.1.1"]);

let app = express();

let PORT = process.env.PORT || 3001;
let FRONTEND_URL = process.env.FRONTEND_URL;

let publicDir = path.join(process.cwd(), "public");

app.use(
    "/api/webhooks/clerk",
    express.raw({ type: "application/json" }),
    clerkWebHooks,
);

app.use(express.json());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
);
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);

    if (process.env.NODE_ENV === "production") {
        job.start();
    }
});
