import { useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import Loader from "../components/ui/Loader";

export default function Cart() {
  const { authReady } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetCartQuery();

  if (!authReady || isLoading) {
    return <Loader message="Loading your cart..." />;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10">❌ Failed to load cart.</p>
    );
  }

  if (!data || !data.success || !data.data?.cart) {
    return (
      <p className="text-red-500 text-center mt-10">❌ Unexpected cart data.</p>
    );
  }

  const cart = data.data.cart;
  console.log("cart data is here:", cart);
  // ✅ Empty cart
  if (!cart.products || cart.products.length === 0) {
    return (
      <p className="text-center text-black mt-10">
        🛒 Your cart is empty.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-black font-arkhip">
      <h2 className="text-3xl text-[#d5b56e] font-bold mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cart.products.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b border-[#d5b56e] py-4"
          >
            <div>
              <p className="text-lg  text-black font-semibold">
                {item.productId?.title || "Unknown Product"}
              </p>
              <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
            </div>
            <p className="text-[#d5b56e] font-bold">
              Rs{" "}
              {item.productId?.price
                ? item.productId.price * item.quantity
                : "N/A"}
            </p>
          </div>
        ))}
        <div className="text-right text-xl font-semibold text-[#d5b56e]">
          Total: Rs {cart.totalAmount}
        </div>
      </div>
    </div>
  );
}
