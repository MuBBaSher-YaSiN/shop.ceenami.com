import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

import { productValidationRules } from "../validators/productValidators.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  productValidationRules,
  validate,
  createProduct,
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  productValidationRules,
  validate,
  updateProduct,
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

export default router;
