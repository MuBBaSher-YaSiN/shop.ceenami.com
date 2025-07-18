import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.data || [];

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6">
      <div className="w-full max-w-screen-xl bg-white/5 backdrop-blur-md text-white p-6 rounded-xl border border-[#d5b56e] shadow-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d5b56e] mb-6 text-center">
          Admin Dashboard
        </h2>

        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-400">Failed to load users</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-700">
              <thead className="bg-[#d5b56e] text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t text-gray-600 border-gray-700 hover:bg-white/10 transition"
                  >
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
