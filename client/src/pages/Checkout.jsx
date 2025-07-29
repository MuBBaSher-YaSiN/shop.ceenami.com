// src/pages/Checkout.js
import CheckoutForm from "./CheckoutForm";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-lg md:text-xl lg:text-2xl sm:font-bold font-bold text-[#d5b56e] mb-2">
            Secure Checkout
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d5b56e] to-yellow-600 mx-auto"></div>
        </div>
        <div className="bg-black/70 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-6 sm:p-8">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}