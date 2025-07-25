import React from "react";
import { useGetLeadsQuery } from "../../features/lead/leadApiSlice";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/ui/Loader";

export default function ManageLeads() {
  const { data, isLoading, isError } = useGetLeadsQuery();

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#d5b56e]/30">
        <h5 className="text-sm sm:text-lg md:text-xl lg:text-2xl sm:font-bold text-[#d5b56e]">
          Leads (User Form Submissions)
        </h5>
      </div>

      {isLoading ? (
        <Loader message="Loading leads..." />
      ) : isError ? (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
          <p className="text-red-300">Failed to load leads</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {data?.data?.length === 0 ? (
            <p className="text-white/80 text-center py-8">No leads found</p>
          ) : (
            <table className="min-w-full divide-y divide-[#d5b56e]/30">
              <thead className="bg-[#d5b56e]/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Lead ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5b56e]/10">
                {data?.data?.map((lead) => (
                  <tr key={lead._id} className="hover:bg-black/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {lead._id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {lead.phone || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {new Date(lead.createdAt).toLocaleString()}
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