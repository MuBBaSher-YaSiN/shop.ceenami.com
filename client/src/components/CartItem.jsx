// src/components/CartItem.jsx
export default function CartItem({ item }) {
  const product = item?.productId;

  if (!product) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-white/20">
      <div className="flex items-center gap-4">
        <img
          src={product.image || "https://via.placeholder.com/80"}
          alt={product.title}
          className="w-20 h-20 object-cover rounded border border-[#d5b56e]"
        />
        <div>
          <h3 className="text-lg font-bold text-[#d5b56e]">{product.title}</h3>
          <p className="text-white">Price: ${product.price}</p>
          <p className="text-gray-400">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="text-white font-semibold">
        ${(product.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
