import { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productApiSlice";
import Loader from "../../components/ui/Loader";
import AddProductModal from "../../components/products/AddProductModal";
import AdminLayout from "../../components/layout/AdminLayout";

export default function ManageProducts() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await deleteProduct(id).unwrap();
      // optionally show toast
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center mb-6 pb-4 border-b border-[#d5b56e]/30">
        <h5 className="text-lg md:text-xl lg:text-2xl sm:font-bold text-[#d5b56e]">
          Manage Products
        </h5>
        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="bg-[#d5b56e] hover:bg-[#c19a3d] text-black px-4 py-2 rounded font-medium transition-colors"
        >
          + Add Product
        </button>
      </div>

      {isLoading ? (
        <Loader message="Loading products..." />
      ) : isError ? (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
          <p className="text-red-300">Failed to load products</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data?.map((product) => (
            <div
              key={product._id}
              className="bg-black/40 border border-[#d5b56e]/30 rounded-lg p-4 hover:shadow-lg hover:shadow-[#d5b56e]/10 transition-all"
            >
              <img
                src={
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=687&auto=format"
                }
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-white mb-1">
                {product.title}
              </h3>
              <p className="text-[#d5b56e] font-bold">Rs {product.price}</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-[#d5b56e] hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddProductModal
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          editMode={!!editData}
          initialData={editData}
        />
      )}
    </AdminLayout>
  );
}
