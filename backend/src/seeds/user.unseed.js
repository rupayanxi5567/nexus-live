import "dotenv/config";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/users.models.js";

async function removeSeedUsers() {
  await connectDB();

  const result = await User.deleteMany({
    clerkId: { $regex: /^seed_/ },
  });

  console.log(`Removed ${result.deletedCount} seed users.`);
}

removeSeedUsers()
  .catch((error) => {
    console.error("Failed to remove seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });