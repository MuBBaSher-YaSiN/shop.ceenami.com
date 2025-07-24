import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/generateToken.js";

// 📌 Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, profileImage, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("Email already exists");
      err.statusCode = 400;
      return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileImage,
      role: role || 'user'
    });

    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    err.statusCode = 500;
    err.message = err.message || "Registration failed";
    next(err);
  }
};

// 🔐 Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 400;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 400;
      return next(err);
    }

    const payload = { userId: user._id, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload);

    //  Push refresh token into the array
    user.refreshTokens.push(refreshToken);
    await user.save();

    //  Send refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //  Send access token and user info
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (err) {
    err.statusCode = 500;
    err.message = err.message || "Login failed";
    next(err);
  }
};

// 🚪 Logout user
export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshTokens: refreshToken },
        { $pull: { refreshTokens: refreshToken } }
      );
      res.clearCookie("refreshToken");
    }

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
