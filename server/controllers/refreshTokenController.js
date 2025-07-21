// server/controllers/refreshTokenController
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokens } from "../utils/generateToken.js";

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    // Check if token is valid first — avoid querying DB unnecessarily
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    const user = await User.findOne({ _id: decoded.userId, refreshTokens: refreshToken });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found or token doesn't match",
      });
    }

    // ✅ All good – issue new access token
    const payload = { userId: user._id, role: user.role };
    const { accessToken } = generateTokens(payload);

    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
      role: user.role,
    });

  } catch (err) {
    next(err);
  }
};

