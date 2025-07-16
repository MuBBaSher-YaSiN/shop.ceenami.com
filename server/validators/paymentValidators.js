// validators/paymentValidators.js
import { body } from "express-validator";

export const validateCreatePaymentIntent = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a valid number")
    .custom((value) => value > 0)
    .withMessage("Amount must be greater than zero"),

  body("currency")
    .optional()
    .isString()
    .withMessage("Currency must be a string"),
];
