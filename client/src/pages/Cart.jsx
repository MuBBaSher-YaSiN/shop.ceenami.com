import { useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom";

export default function Cart() {
  const { authReady } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetCartQuery();

  if (!authReady || isLoading) {
    return <Loader message="Loading your cart..." />;
  }

  if (isError) {
    return (
      <p className="text-red-400 text-center mt-10 text-sm sm:text-base">
        ❌ Failed to load cart.
      </p>
    );
  }

  if (!data || !data.success || !data.data?.cart) {
    return (
      <p className="text-red-400 text-center mt-10 text-sm sm:text-base">
        ❌ Unexpected cart data.
      </p>
    );
  }

  const cart = data.data.cart;
  if (!cart.products || cart.products.length === 0) {
    return (
      <p className="text-center text-black mt-10 text-sm sm:text-base">
        🛒 Your cart is empty.
      </p>
    );
  }

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md text-black p-4 sm:p-6 rounded-xl border border-[#d5b56e] shadow-2xl font-arkhip">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-black text-center sm:text-left">
          Your Cart
        </h2>

        <div className="space-y-6">
          {cart.products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#d5b56e] py-3 sm:py-4 gap-1"
            >
              <div>
                <p className="text-base sm:text-lg font-semibold">
                  {item.productId?.title || "Unknown Product"}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="text-sm sm:text-base text-black font-bold">
                Rs{" "}
                {item.productId?.price
                  ? item.productId.price * item.quantity
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right mt-6 text-lg sm:text-xl font-semibold text-black">
          Total: Rs {cart.totalAmount}
        </div>

        <div className="text-right mt-6">
          <Link
            to="/checkout"
            className="inline-block bg-[#d5b56e] text-black px-4 sm:px-6 py-2 rounded text-sm sm:text-base font-semibold hover:bg-black transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
