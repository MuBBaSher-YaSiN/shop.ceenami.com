import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import Loader from "../components/ui/Loader";

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth); // ✅ Get token from Redux

  useEffect(() => {
    axios.post(
      "api/payments/create-payment-intent",
      {
        amount: 7495,
        currency: "usd",
      },
      {
        headers: {
          Authorization: 'Bearer ${token}', // ✅ fixed: used backticks
        },
      }
    )
    .then((res) => {
      console.log("Client Secret:", res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    })
    .catch((err) => {
      console.error("Stripe error: ", err);
      alert("⚠ Failed to initiate payment");
    })
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader message="Setting up payment..." />;

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-[#d5b56e] text-center">Checkout</h2>
      <CheckoutForm clientSecret={clientSecret} />
    </div>
  );
}