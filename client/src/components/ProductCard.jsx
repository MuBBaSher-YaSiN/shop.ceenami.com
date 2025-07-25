import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUpdateCartMutation } from "../features/cart/cartApiSlice";
import { toast } from "react-toastify";

export default function ProductCard({ product, isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateCart, { isLoading }] = useUpdateCartMutation();

  const handleClick = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      try {
        await updateCart({ productId: product._id, quantity: 1 }).unwrap();
        toast.success("Added to cart!");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add to cart");
      }
    }
  };

  return (
    <div className="bg-black border border-[#d5b56e] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#d5b56e]/50 transition-all duration-300">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative w-full h-64 rounded-t-lg overflow-hidden group">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.images[1]}
            alt={product.title}
            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-[#d5b56e] font-bold mt-2">${product.price}</p>
        </div>
      </Link>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full py-3 px-4 font-semibold transition-colors duration-300 ${
          isLoggedIn
            ? "bg-[#d5b56e] text-black hover:bg-[#c9a95d]"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {isLoggedIn
          ? isLoading
            ? "Adding..."
            : "Add to Cart"
          : "Login to Add"}
      </button>
    </div>
  );
}