import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.userId,
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};
// Get all orders (Admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};