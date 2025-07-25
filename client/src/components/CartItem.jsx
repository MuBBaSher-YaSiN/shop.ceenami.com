// src/components/CartItem.jsx
export default function CartItem({ item }) {
  const product = item?.productId;

  if (!product) return null;

  return (
    <div className="flex items-center justify-between gap-6 py-6 border-b border-[#d5b56e]/30">
      <div className="flex items-center gap-6">
        <div className="relative w-14 sm:w-24 h-24 rounded-md overflow-hidden border border-[#d5b56e]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#d5b56e]">{product.title}</h3>
          <p className="text-white">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-400 mr-2">Qty:</span>
            <span className="text-white font-medium">{item.quantity}</span>
          </div>
        </div>
      </div>
      <div className="text-xs md:text:base lg:text-xl font-bold text-white">
        ${(product.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}