import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  promoteToAdmin,
} from "../controllers/userController.js";

import {
  protect,
  authorizeRoles,
  canEditUser,
} from "../middlewares/authMiddleware.js";

import validate from "../middlewares/validate.js";
import {
  getUserValidator,
  updateUserValidator,
  promoteUserValidator,
  deleteUserValidator,
} from "../validators/userValidators.js";

const router = express.Router();

// Admin-only
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getUserValidator,
  validate,
  getUserById,
);

router.put(
  "/:id/promote",
  protect,
  authorizeRoles("admin"),
  promoteUserValidator,
  validate,
  promoteToAdmin,
);

// Admin or self
router.put(
  "/:id",
  protect,
  canEditUser,
  updateUserValidator,
  validate,
  updateUser,
);

router.delete(
  "/:id",
  protect,
  canEditUser,
  deleteUserValidator,
  validate,
  deleteUser,
);

export default router;
