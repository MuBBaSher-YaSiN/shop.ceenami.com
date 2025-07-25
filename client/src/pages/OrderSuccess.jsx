import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-black  flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-8 sm:p-10 text-center max-w-md w-full">
        <div className="text-6xl text-[#d5b56e] mb-4">🎉</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#d5b56e] mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-white/80 mb-6">
          Thank you for your purchase. You'll receive an email confirmation shortly.
        </p>
        <div className="h-1 w-20 bg-[#d5b56e] mx-auto mb-6"></div>
        <Link
          to="/"
          className="inline-block bg-[#d5b56e] hover:bg-black text-black font-bold py-2 px-6 rounded transition-colors"
        >
          Start a New Order
        </Link>
      </div>
    </div>
  );
}