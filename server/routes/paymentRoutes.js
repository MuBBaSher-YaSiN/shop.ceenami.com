import express from "express";
import {
  createPaymentIntent,
  getPaymentDetails,
} from "../controllers/paymentController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { validateCreatePaymentIntent } from "../validators/paymentValidators.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// Only users are allowed to pay and view their payments
router.post(
  "/create-payment-intent",
  protect,
  authorizeRoles("user"),
  validateCreatePaymentIntent,
  validate,
  createPaymentIntent
);

router.get("/:id", protect, authorizeRoles("user"), getPaymentDetails);

export default router;
