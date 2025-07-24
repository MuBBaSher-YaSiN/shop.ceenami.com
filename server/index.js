import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import connectDB from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js"; // rate limiter middleware
import logger from "./utils/logger.js";
import responseFormatter from "./middlewares/responseFormatter.js"; // Optional

// Route imports
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware Setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://shopceenamicom.vercel.app/", // replace with your frontend domain
    credentials: true, // Allow cookies across origins
  }),
);

app.use(rateLimiter); // Global rate limiting

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(responseFormatter); // Format all successful responses

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/leads", leadRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Global Error Handler (must be after routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err); // Log the full error
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

//  Connect DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});
