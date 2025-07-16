import express from "express";
import {
  createCart,
  getUserCart,
  updateCart,
  removeCartItem,
  deleteCart,
} from "../controllers/cartController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  validateCreateCart,
  validateUpdateCart,
  validateRemoveCartItem,
} from "../validators/cartValidators.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// All routes protected and user-only
router.post("/", protect, authorizeRoles("user"), validateCreateCart, validate, createCart);
router.get("/", protect, authorizeRoles("user"), getUserCart);
router.put("/", protect, authorizeRoles("user"), validateUpdateCart, validate, updateCart);
router.delete("/:productId", protect, authorizeRoles("user"), validateRemoveCartItem, validate, removeCartItem);
router.delete("/", protect, authorizeRoles("user"), deleteCart);

export default router;
