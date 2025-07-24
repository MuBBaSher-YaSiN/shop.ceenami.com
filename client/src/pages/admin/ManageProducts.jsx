import { useState } from "react";
import { useGetProductsQuery } from "../../features/products/productApiSlice";
import Loader from "../../components/ui/Loader";
import AddProductModal from "../../components/products/AddProductModal";

export default function ManageProducts() {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-screen-xl bg-white/5 backdrop-blur-md text-white p-3 sm:p-4 md:p-6 rounded-xl border border-[#d5b56e] shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#d5b56e]">
            Manage Products
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#d5b56e] text-black px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-yellow-600 transition font-semibold text-xs sm:text-sm"
          >
            + Add Product
          </button>
        </div>

        {isLoading ? (
          <p className="text-white text-center text-sm sm:text-base">
            Loading products...
          </p>
        ) : isError ? (
          <p className="text-red-400 text-center text-sm sm:text-base">
            Failed to load products
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/10 border border-[#d5b56e] rounded-lg p-3 sm:p-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=687&auto=format"
                  alt={product.title}
                  className="w-full h-36 sm:h-40 object-cover rounded mb-2"
                />
                <h3 className="text-sm text-black sm:text-base md:text-lg font-semibold mb-1">
                  {product.title}
                </h3>
                <p className="text-[#d5b56e] font-bold text-sm sm:text-base">
                  ${product.price}
                </p>
                <div className="mt-3 space-x-3">
                  <button className="text-yellow-400 hover:underline text-xs sm:text-sm">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline text-xs sm:text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
