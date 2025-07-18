import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../features/products/productApiSlice"; // ✅ fixed
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { user, authReady } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetProductsQuery(); // ✅ fixed

  const products = data?.data || [];

  console.log("🔁 isLoading:", isLoading);
  console.log("❌ isError:", isError);
  console.log("📦 product data:", data);

  if (!authReady) return <p className="text-white text-center">Waiting for auth...</p>;

  return (
    <div className="w-full min-h-[80vh]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#d5b56e] mb-8 text-center">
        Featured Products
      </h1>

      {isLoading ? (
        <p className="text-white text-center">Loading...</p>
      ) : isError ? (
        <p className="text-red-400 text-center">Failed to load products</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {products.map((product) =>
            product && product._id ? (
              <ProductCard
                key={product._id}
                product={product}
                isLoggedIn={!!user}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
