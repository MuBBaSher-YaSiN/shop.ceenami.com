// src/components/CartItem.jsx
import { useDeleteFromCartMutation } from "../features/cart/cartApiSlice";
import { toast } from "react-toastify";

export default function CartItem({ item }) {
  const [deleteFromCart, { isLoading }] = useDeleteFromCartMutation();

  const handleRemove = async () => {
    try {
      await deleteFromCart(item._id).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-600 py-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-16 h-16 object-cover rounded border border-[#d5b56e]"
        />
        <div>
          <h3 className="text-lg font-semibold text-[#d5b56e]">
            {item.product.title}
          </h3>
          <p className="text-gray-300">${item.product.price}</p>
        </div>
      </div>

      <button
        onClick={handleRemove}
        disabled={isLoading}
        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        {isLoading ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}
