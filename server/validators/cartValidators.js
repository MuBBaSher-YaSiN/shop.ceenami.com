// validators/cartValidators.js
import { body, param } from "express-validator";

export const validateCreateCart = [
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item"),
  body("products.*.productId")
    .notEmpty()
    .withMessage("Each product must have a productId"),
  body("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a positive number"),
];

export const validateUpdateCart = [
  body("productId").notEmpty().withMessage("productId is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

export const validateRemoveCartItem = [
  param("productId").notEmpty().withMessage("Product ID is required"),
];
