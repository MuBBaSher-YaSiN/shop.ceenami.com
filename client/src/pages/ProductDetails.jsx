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
      const cartAddedData = await updateCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();
      toast.success("Added to cart!");
      console.log("cart added ", cartAddedData);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  if (isLoading || !authReady) return <Loader />;
  if (isError || !product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-400 text-lg">Product not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-lg overflow-hidden border-2 border-[#d5b56e]/50">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={product.images[1] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
            
            {/* Thumbnail Grid (if more images exist) */}
            {product.images.length > 2 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0,4).map((img, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-md overflow-hidden border border-[#d5b56e]/30 cursor-pointer hover:border-[#d5b56e] transition"
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-[#d5b56e] mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-[#d5b56e]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-3 text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-white/80 leading-relaxed">
                {product.description || "Premium quality product with exquisite craftsmanship. Designed for those who appreciate luxury and attention to detail."}
              </p>
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <span className="text-gray-400">Category:</span>
                <span className="ml-2 text-white">{product.category || 'Luxury'}</span>
              </div>
              <div>
                <span className="text-gray-400">Availability:</span>
                <span className="ml-2 text-[#d5b56e]">In Stock</span>
              </div>
            </div>

            {/* Add to Cart */}
            {user?.role === "user" ? (
              <button
                onClick={handleAdd}
                disabled={adding}
                className={`w-full py-3 px-6 rounded-md font-bold transition-colors ${
                  adding 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#d5b56e] hover:bg-[#c19a3d] text-black'
                }`}
              >
                {adding ? "Adding to Cart..." : "Add to Cart"}
              </button>
            ) : (
              <div className="bg-black/50 border border-red-500/50 text-red-400 p-3 rounded-md text-center">
                {user ? "Only customers can purchase items" : "Please login to add to cart"}
              </div>
            )}

            {/* Product Highlights */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#d5b56e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Premium Quality Materials</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#d5b56e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Free Worldwide Shipping</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#d5b56e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>24-Month Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}