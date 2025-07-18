// src/components/CartItem.jsx
import { useRemoveFromCartMutation } from "../features/cart/cartApiSlice";

export default function CartItem({ item }) {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const handleRemove = () => {
    removeFromCart(item.product._id);
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md border border-[#d5b56e] flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg text-white font-semibold">{item.product.title}</h3>
        <p className="text-sm text-gray-300">${item.product.price}</p>
      </div>
      <button
        disabled={isLoading}
        onClick={handleRemove}
        className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
      >
        {isLoading ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}
