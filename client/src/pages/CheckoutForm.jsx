import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../components/ui/Button";

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

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");
    } else {
      setMessage("⚠️ Something went wrong.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white max-w-xl mx-auto mt-10">
      <CardElement options={CARD_OPTIONS} className="p-4 bg-[#1e1e1e] rounded" />
      <Button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay Now"}
      </Button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}
