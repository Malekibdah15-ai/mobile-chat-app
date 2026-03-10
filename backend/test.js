import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch(err => console.error("❌ Connection failed:", err));