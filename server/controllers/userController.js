import User from "../models/User.js";
import bcrypt from "bcryptjs";
import logger from '../utils/logger.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    logger.error("Error fetching users:", error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    logger.error("Error fetching user:", error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { fullName, email, password, profileImage } = req.body;
    const updateData = { name: fullName, email, profileImage };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    logger.error("Error updating user:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    logger.error("Error deleting user:", error);
    next(error);
  }
};

export const promoteToAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User promoted to admin", user });
  } catch (err) {
    logger.error("Promotion error:", err);
    next(err);
  }
};
