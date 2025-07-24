import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="text-center mt-20 text-[#d5b56e]  font-arkhip">
      <h1 className="text-3xl text-black font-bold mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg">Thank you for your purchase.</p>
     <Link
  to="/"
  className="inline-block bg-black text-white  k px-4 sm:px-6 py-2 mt-10 rounded text-sm sm:text-base font-semibold transition"
>
  Start a New Order
</Link>

      {/* <p className="mt-4 text-gray-400">You’ll receive an email confirmation shortly.</p> */}
    </div>
  );
}
