import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../validators/authValidators.js";
import validate from "../middlewares/validate.js";
import { refreshAccessToken } from "../controllers/refreshTokenController.js";
import { logoutUser } from "../controllers/authController.js"; 

const router = express.Router();
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.post("/register", validateRegister, validate, registerUser);
router.post("/login", validateLogin, validate, loginUser);

export default router;
