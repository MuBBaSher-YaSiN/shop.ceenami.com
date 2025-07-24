import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

//  User routes
router.post("/", protect, authorizeRoles("user"), createOrder);
router.get("/", protect, authorizeRoles("user"), getUserOrders);

//  Admin route to get all orders
router.get("/admin", protect, authorizeRoles("admin"), getAllOrders);

export default router;
