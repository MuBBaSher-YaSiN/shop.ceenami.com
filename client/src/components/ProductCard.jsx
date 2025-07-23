import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUpdateCartMutation } from "../features/cart/cartApiSlice";
import { toast } from "react-toastify";

export default function ProductCard({ product, isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
 const [updateCart, { isLoading }] = useUpdateCartMutation();

 const handleClick = async () => {
  if (!isLoggedIn) {
    navigate("/login", {
      state: { from: location.pathname },
    });
  } else {
    try {
      await updateCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();
      toast.success("✅ Added to cart!");
      console.log('cart added😁😁haha')
    } catch (err) {
      toast.error(err?.data?.message || "❌ Failed to add to cart");
    }
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-md text-black border border-[#d5b56e] hover:shadow-[#d5b56e] rounded-xl hover:shadow-2xl shadow-lg p-4 space-y-3 w-full sm:w-72">
      <Link to={`/products/${product._id}`}>
        <img
          src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.title}
          className="w-full h-50 object-cover rounded-md border border-[#d5b56e]"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="text-[#d5b56e] font-bold">${product.price}</p>
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
