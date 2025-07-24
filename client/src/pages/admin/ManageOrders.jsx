import React from "react";
import { useGetAllOrdersQuery } from "../../features/order/orderApiSlice";

export default function ManageOrders() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <p className="text-black text-center">Loading Orders...</p>;
  if (isError) return <p className="text-red-400 text-center">Failed to fetch orders</p>;

  const orders = data?.data || [];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-base md:text-xl font-bold text-black mb-6 text-center">All Orders</h2>
      {orders.length === 0 ? (
        <p className="text-black text-center">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-xs sm:text-sm text-left border-collapse border border-gray-700">
            <thead className="bg-[#2a2a2a] text-white">
              <tr>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">Order ID</th>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">User Name</th>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">Email</th>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">Phone</th>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">Total Items</th>
                <th className="p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-black text-xs sm:text-sm">
                  <td className="p-2 border border-gray-700">{order._id}</td>
                  <td className="p-2 border border-gray-700">{order.user?.name || "N/A"}</td>
                  <td className="p-2 border border-gray-700">{order.user?.email}</td>
                  <td className="p-2 border border-gray-700">{order.user?.phone || "N/A"}</td>
                  <td className="p-2 border border-gray-700">{order.items?.length || 0}</td>
                  <td className="p-2 border border-gray-700">Rs {order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
