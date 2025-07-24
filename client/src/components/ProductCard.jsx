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
        toast.success(" Added to cart!");
      } catch (err) {
        toast.error(err?.data?.message || " Failed to add to cart");
      }
    }
  };

  return (
    
    <div className="bg-white/10 backdrop-blur-md text-black border border-[#d5b56e] hover:shadow-[#d5b56e] rounded-xl hover:shadow-lg shadow-lg p-4 space-y-3 w-full sm:w-72">
      <Link to={`/products/${product._id}`}>
        {/* 👇 Dual-image hover effect */}
        <div className="relative w-full h-48 sm:h-52 rounded-md overflow-hidden border border-[#d5b56e] group">
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

        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-gray-700 font-bold">${product.price}</p>
      </Link>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full py-2 mt-2 font-semibold rounded ${
          isLoggedIn
            ? "bg-[#d5b56e] text-black hover:bg-[#e6c97f]"
            : "bg-gray-500 hover:bg-gray-600"
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