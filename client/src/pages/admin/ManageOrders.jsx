import React from "react";
import { useGetAllOrdersQuery } from "../../features/order/orderApiSlice";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/ui/Loader";

export default function ManageOrders() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#d5b56e]/30">
        <h5 className="text-sm sm:text-lg md:text-xl lg:text-2xl sm:font-bold text-[#d5b56e]">
          All Orders
        </h5>
      </div>

      {isLoading ? (
        <Loader message="Loading orders..." />
      ) : isError ? (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
          <p className="text-red-300">Failed to load orders</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {data?.data?.length === 0 ? (
            <p className="text-white/80 text-center py-8">No orders found</p>
          ) : (
            <table className="min-w-full divide-y divide-[#d5b56e]/30">
              <thead className="bg-[#d5b56e]/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5b56e]/10">
                {data?.data?.map((order) => (
                  <tr key={order._id} className="hover:bg-black/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      <div className="font-medium">{order.user?.name || 'N/A'}</div>
                      <div className="text-white/70">{order.user?.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      <span className="text-[#d5b56e] font-bold">Rs {order.amount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
}