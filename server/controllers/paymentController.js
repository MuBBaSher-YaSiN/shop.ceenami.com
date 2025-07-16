import Stripe from 'stripe';
import logger from '../utils/logger.js';

export const createPaymentIntent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount, currency = "usd" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    logger.error("Error creating payment intent:", error.message);
    next(error);
  }
};

export const getPaymentDetails = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

    res.status(200).json(paymentIntent);
  } catch (error) {
    logger.error("Error retrieving payment intent:", error.message);
    next(error);
  }
};
