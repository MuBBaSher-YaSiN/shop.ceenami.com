import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.data || [];

  return (
    <div className="w-full min-h-[80vh] flex flex-col lg:flex-row gap-6 mt-6">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-white/10 p-4 rounded-lg border border-[#d5b56e] text-gray-600">
        <h2 className="text-xl font-bold mb-4 text-[#d5b56e]">Admin Panel</h2>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="block hover:underline text-gray-600"
          >
            🧭 Dashboard
          </Link>
          <Link
            to="/products"
            className="block hover:underline text-gray-600"
          >
            📦 Manage Products
          </Link>
          {/* Optional: Add more links here */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4 w-full bg-white/5 backdrop-blur-md text-white p-6 rounded-xl border border-[#d5b56e] shadow-2xl">
        <h2 className="text-2xl font-bold text-[#d5b56e] mb-6 text-center">
          Users List
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
      </main>
    </div>
  );
}
