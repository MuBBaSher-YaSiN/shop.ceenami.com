// src/pages/Cart.jsx
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import CartItem from "../components/CartItem";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCartQuery();

  const items = data?.data || [];

  const total = items.reduce((acc, item) => acc + item.product.price, 0);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-500">
        ❌ Failed to load your cart items.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-white font-arkhip">
      <h2 className="text-3xl font-bold text-[#d5b56e] mb-6 text-center">
        Your Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty 🛒</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="text-right mt-6 text-xl">
            <p className="text-[#d5b56e] font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-[#d5b56e] text-black px-6 py-2 rounded hover:bg-yellow-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
