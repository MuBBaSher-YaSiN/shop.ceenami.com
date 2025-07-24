import { body, param } from "express-validator";

export const getUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

export const promoteUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
