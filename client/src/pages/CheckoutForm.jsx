// src/pages/CheckoutForm.js
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import Loader from "../components/ui/Loader";
import { useCreateOrderMutation } from "../features/order/orderApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#fff",
      "::placeholder": { 
        color: "#aaa",
      },
      iconColor: "#d5b56e",
    },
    invalid: { 
      color: "#fa755a",
      iconColor: "#fa755a" 
    },
  },
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  const { data, isLoading, isError } = useGetCartQuery();
  const cart = data?.data?.cart;
  const totalAmount = cart?.totalAmount || 0;

  const [billing, setBilling] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      toast.error("Cart total is invalid.");
      return;
    }

    setProcessing(true);

    try {
      const amountInCents = Math.round((totalAmount / 280) * 100);

      const res = await axios.post(
        "/api/payments/create-payment-intent",
        {
          amount: amountInCents,
          currency: "usd",
          name: billing.name,
          email: billing.email,
          phone: billing.phone,
          address: billing.address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      const clientSecret = res?.data?.data?.clientSecret;

      if (!clientSecret) {
        toast.error("Missing client secret from server.");
        setProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card Element not found.");
        setProcessing(false);
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billing.name,
              email: billing.email,
              phone: billing.phone,
              address: {
                line1: billing.address,
              },
            },
          },
        },
      );

      if (error) {
        toast.error(error.message || "Payment failed.");
      } else if (paymentIntent?.status === "succeeded") {
        const orderPayload = {
          products: cart.products.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
          })),
          totalAmount,
          paymentStatus: "paid",
          paymentIntentId: paymentIntent.id,
          shippingDetails: billing,
        };

        const result = await createOrder(orderPayload);
        if (result?.error) {
          toast.error("Failed to save order.");
          return;
        }
        
        await axios.delete("/api/cart", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        toast.success("Payment successful!");
        navigate("/order-success");
      } else {
        toast.warning("⚠ Payment status: " + paymentIntent?.status);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payment request failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) return <Loader message="Preparing checkout..." />;
  if (isError || !cart)
    return (
      <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
        <p className="text-red-300">Failed to fetch cart</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          name="name"
          value={billing.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
          required
        />
        <Input
          type="email"
          name="email"
          value={billing.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
          required
        />
        <Input
          type="tel"
          name="phone"
          value={billing.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
          required
        />
        <Input
          type="text"
          name="address"
          value={billing.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black md:col-span-2"
          required
        />
      </div>

      <div className="p-5 bg-black/50 border border-[#d5b56e]/30 rounded-lg">
        <CardElement options={CARD_OPTIONS} />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#d5b56e]/30">
        <div className="text-sm sm:text-lg  text-[#d5b56e]">
          Total: Rs {totalAmount.toFixed(2)}
        </div>
        <Button
          type="submit"
          disabled={!stripe || processing}
          className={`px-8 py-3 font-bold ${
            processing ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#d5b56e] hover:bg-[#c19a3d] text-black'
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
}