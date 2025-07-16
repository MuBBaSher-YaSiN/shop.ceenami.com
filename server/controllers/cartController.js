import Cart from "../models/Cart.js";
import User from "../models/User.js";
import logger from '../utils/logger.js';

export const createCart = async (req, res, next) => {
  try {
    const { products, totalAmount } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingCart = await Cart.findOne({ user: userId });
    if (existingCart) {
      return res.status(400).json({ error: "Cart already exists" });
    }

    const cart = new Cart({
      user: userId,
      email: user.email,
      products,
      totalAmount,
    });

    await cart.save();
    res.status(201).json({ message: "Cart saved successfully", cart });
  } catch (error) {
    logger.error("Error creating cart:", error);
    next(error);
  }
};

export const getUserCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    logger.error("Error retrieving cart:", error);
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.products.find(p => p.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    logger.error("Cart update error:", err);
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const updatedProducts = cart.products.filter(p => p.productId.toString() !== productId);
    if (updatedProducts.length === cart.products.length) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cart.products = updatedProducts;
    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    logger.error("Error removing item:", error);
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "No cart found to delete" });
    }

    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    logger.error("Error deleting cart:", error);
    next(error);
  }
};
