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
      "::placeholder": { color: "#ccc" },
    },
    invalid: { color: "#fa755a" },
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
      // Convert Rs to USD cents (example: 7495 Rs → ~2676 cents if 1 USD = 280 PKR)
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
        }
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
        }
      );

      if (error) {
        toast.error(error.message || "Payment failed.");
      } else if (paymentIntent?.status === "succeeded") {
         // ✅ Save order in DB
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
        if(result?.error){
          toast.error("Failed to save order.")
          return;
        }
        // ✅ Clear cart
        await axios.delete("/api/cart", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        toast.success("✅ Payment successful!");
          // ✅ Redirect to success page
        navigate("/order-success");

      } else {
        toast.warning("⚠ Payment status: " + paymentIntent?.status);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Payment request failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) return <Loader message="Preparing checkout..." />;
  if (isError || !cart) return <p className="text-red-500 text-center mt-10">❌ Failed to fetch cart.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-white max-w-xl mx-auto mt-10"
    >
      <Input
        type="text"
        name="name"
        value={billing.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <Input
        type="email"
        name="email"
        value={billing.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        type="tel"
        name="phone"
        value={billing.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <Input
        type="text"
        name="address"
        value={billing.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <div className="p-4 bg-[#1e1e1e] rounded">
        <CardElement options={CARD_OPTIONS} />
      </div>

      <div className="text-right text-xs md:text-base  text-black">
        You will be charged: Rs {totalAmount}
      </div>

      <Button className="" type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}