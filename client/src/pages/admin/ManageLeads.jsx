import React from "react";
import { useGetLeadsQuery } from "../../features/lead/leadApiSlice";

export default function ManageLeads() {
  const { data, isLoading, isError } = useGetLeadsQuery();

  if (isLoading)
    return <p className="text-black text-center">Loading leads...</p>;
  if (isError)
    return <p className="text-red-400 text-center">Failed to fetch leads</p>;

  const leads = data?.data || [];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-base md:text-xl font-bold text-black mb-6 text-center">
        Leads (User Form Submissions)
      </h2>
      {leads.length === 0 ? (
        <p className="text-black text-center">No leads found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-xs sm:text-sm text-left border-collapse border border-gray-700">
            <thead className="bg-[#2a2a2a] text-white">
              <tr>
                <th className=" p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">
                  Lead ID
                </th>
                <th className=" p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">
                  Name
                </th>
                <th className=" p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">
                  Email
                </th>
                <th className=" p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">
                  Phone
                </th>
                <th className=" p-1 sm:px-1 sm:py-2 font-normal md:p-3 border border-gray-700">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="text-black text-xs sm:text-sm">
                  <td className="p-2 border border-gray-700">{lead._id}</td>
                  <td className="p-2 border border-gray-700">{lead.name}</td>
                  <td className="p-2 border border-gray-700">{lead.email}</td>
                  <td className="p-2 border border-gray-700">{lead.phone}</td>
                  <td className="p-2 border border-gray-700">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
