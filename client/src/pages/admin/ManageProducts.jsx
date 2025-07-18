import { useGetProductsQuery } from "../../features/products/productApiSlice";
import Loader from "../../components/ui/Loader";

export default function ManageProducts() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6">
      <div className="w-full max-w-screen-xl bg-white/5 backdrop-blur-md text-white p-6 rounded-xl border border-[#d5b56e] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#d5b56e]">
            Manage Products
          </h2>
          <button className="bg-[#d5b56e] text-black px-4 py-2 rounded hover:bg-yellow-600 transition font-semibold">
            + Add Product
          </button>
        </div>

        {isLoading ? (
          <p className="text-white text-center">Loading products...</p>
        ) : isError ? (
          <p className="text-red-400 text-center">Failed to load products</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/10 border border-[#d5b56e] rounded-lg p-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=687&auto=format"
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-[#d5b56e] font-bold">${product.price}</p>
                <div className="mt-3 space-x-2">
                  <button className="text-yellow-400 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
