import { body } from "express-validator";

export const productValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long"),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description is too long"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];
