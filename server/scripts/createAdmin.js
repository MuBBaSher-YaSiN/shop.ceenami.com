import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import logger from '../utils/logger.js';
dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      logger.info("❌ Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    logger.log("✅ Admin created successfully:", admin.email);
    process.exit();
  } catch (err) {
    logger.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
