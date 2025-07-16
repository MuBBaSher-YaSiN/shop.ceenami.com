import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokens } from "../utils/generateToken.js";

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || user._id.toString() !== decoded.userId) {
        return res.status(403).json({ error: "Token is invalid or expired" });
      }

      const payload = { userId: user._id, role: user.role };
      const { accessToken } = generateTokens(payload);
console.log("Incoming Cookie:", req.cookies.refreshToken);
console.log("User found with token:", user);
      return res.status(200).json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};

