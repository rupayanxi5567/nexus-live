import express from "express"
import cors from "cors"
import "dotenv/config"
import dns from "dns";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express"

dns.setServers(["1.1.1.1"]);

let app = express();
let PORT = process.env.PORT || 3001;

let FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json())
app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}))
app.use(clerkMiddleware())

app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok" })
})

app.listen(PORT, () => {
    connectDB()
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})