import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productApiSlice";
import { useUpdateCartMutation } from "../features/cart/cartApiSlice";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();
  const { user, authReady } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
 const [updateCart, { isLoading: adding }] = useUpdateCartMutation();

  const product = data?.data;

const handleAdd = async () => {
  try {
    const cartAddedData = await  updateCart({
      productId: product._id,
      quantity: 1,
    }).unwrap();
    toast.success(" Added to cart!");
    console.log('cart added ',cartAddedData )
  } catch (err) {
    toast.error(err?.data?.message || " Failed to add to cart");
  }
};


  if (isLoading || !authReady) return <Loader />;
  if (isError || !product)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white font-arkhip">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.title}
          className="rounded-lg shadow-lg w-full h-auto"
        />
        <div>
          <h2 className="text-3xl font-bold text-[#d5b56e] mb-4">
            {product.title}
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Minimal Sneakers combine comfort and style with a sleek silhouette. Built for everyday wear, they feature premium materials, durable soles, and breathable mesh. A must-have choice for modern wardrobes.
          </p>
          <p className="text-xl font-semibold text-[#d5b56e] mb-6">
            ${product.price}
          </p>

          {user?.role === "user" ? (
            <button
              onClick={handleAdd}
              disabled={adding}
              className="bg-[#d5b56e] text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          ) : (
            <p className="text-red-400 font-semibold">
              Only users can add to cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
