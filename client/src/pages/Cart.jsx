// src/pages/Cart.jsx
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { authReady } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetCartQuery();

  if (!authReady || isLoading) {
    return <Loader message="Loading your cart..." />;
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-400 text-center text-lg">
          Failed to load cart. Please try again.
        </p>
      </div>
    );
  }

  if (!data || !data.success || !data.data?.cart) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-400 text-center text-lg">
          Unexpected cart data format.
        </p>
      </div>
    );
  }

  const cart = data.data.cart;
  if (!cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-[#d5b56e] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-2xl text-white mb-6">Your cart is empty</p>
        <Link
          to="/"
          className="bg-[#d5b56e] hover:bg-[#c19a3d] text-black font-bold py-3 px-8 rounded-md transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-[#d5b56e] mb-10 text-center">
          Your Shopping Cart
        </h1>

        <div className="bg-black/70 backdrop-blur-sm border border-[#d5b56e]/30 rounded-lg p-6 shadow-lg shadow-[#d5b56e]/10">
          <div className="space-y-6 mb-8">
            {cart.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-[#d5b56e]/30 pt-6">
            <div className="text-2xl font-bold text-white">Total:</div>
            <div className="text-2xl font-bold text-[#d5b56e]">
              ${cart.totalAmount.toFixed(2)}
            </div>
          </div>

          <div className="mt-10 flex text-xs sm:text-sm md:text-base text-[#d5b56e] justify-end space-x-4">
            <Link
              to="/"
              className="bg-transparent border border-[#d5b56e]  hover:bg-[#d5b56e]/10 font-bold py-3 px-8 rounded-md transition duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="bg-transparent border border-[#d5b56e]  hover:bg-[#d5b56e]/10 font-bold py-3 px-8 rounded-md transition duration-300"
              
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}