import { useState } from "react";
import { useCreateProductMutation } from "../../features/products/productApiSlice";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";

export default function AddProductModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    category: "",
    brand: "",
    size: "",
    color: "",
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      images: [formData.image1, formData.image2],
      category: formData.category,
      brand: formData.brand || "No Brand",
      size: formData.size,
      color: formData.color,
    };

    try {
      await createProduct(productPayload).unwrap();
      toast.success("Product created successfully");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center px-4">
      <div className="bg-[#1a1a1a] border border-[#d5b56e] rounded-lg p-6 w-full max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#d5b56e] hover:text-red-400 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-[#d5b56e]">
          Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-sm sm:text-base"
        >
          <input
            type="text"
            name="title"
            placeholder="Title *"
            required
            value={formData.title}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price *"
            required
            value={formData.price}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category *"
            required
            value={formData.category}
            onChange={handleChange}
            className="input"
          />
          <textarea
            name="description"
            placeholder="Description *"
            required
            value={formData.description}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="image1"
            placeholder="Image URL (Default) *"
            required
            value={formData.image1}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="image2"
            placeholder="Image URL (Hover) *"
            required
            value={formData.image2}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand (optional)"
            value={formData.brand}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="size"
            placeholder="Size (optional)"
            value={formData.size}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="color"
            placeholder="Color (optional)"
            value={formData.color}
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d5b56e] text-black py-2 rounded hover:bg-yellow-600 font-semibold"
          >
            {isLoading ? <Loader small /> : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
