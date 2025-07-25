import { useGetAllOrdersQuery } from "../../features/order/orderApiSlice";
import Loader from "../../components/ui/Loader";

export default function AdminOrders() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <Loader message="Loading orders..." />;
  if (isError) return <p className="text-red-500"> Failed to load orders.</p>;

  const orders = data?.data || [];

  return (
    <div className="max-w-5xl mx-auto p-6 font-arkhip text-white">
      <h1 className="text-3xl text-[#d5b56e] font-bold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-[#d5b56e] rounded p-4"
            >
              <p className="text-[#d5b56e] font-semibold">
                👤 {order.user?.name} ({order.user?.email})
              </p>
              <p className="mt-2">🛒 Total: Rs {order.totalAmount}</p>
              <p>📦 Status: {order.paymentStatus}</p>
              <p>🧾 Items:</p>
              <ul className="ml-4 list-disc">
                {order.products.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity} × Rs {item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}