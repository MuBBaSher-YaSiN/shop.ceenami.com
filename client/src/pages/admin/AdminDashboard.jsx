import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useUpdateUserMutation } from "../../features/auth/authApiSlice";
import { useState } from "react";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.data || [];
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 w-full bg-black/70 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-6 text-[#d5b56e] border-b border-[#d5b56e]/30 pb-3">
              Admin Panel
            </h2>
            <nav className="space-y-3 text-white/80">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:text-[#d5b56e] transition-colors"
              >
                <span>🧭</span>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 hover:text-[#d5b56e] transition-colors"
              >
                <span>📦</span>
                <span>Manage Products</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-2 hover:text-[#d5b56e] transition-colors"
              >
                <span>🧾</span>
                <span>Manage Orders</span>
              </Link>
              <Link
                to="/admin/leads"
                className="flex items-center gap-2 hover:text-[#d5b56e] transition-colors"
              >
                <span>🧍‍♀️</span>
                <span>Manage Leads</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-black/70 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#d5b56e]/30">
              <h2 className="text-xl sm:text-2xl font-bold text-[#d5b56e]">
                Users List
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d5b56e]"></div>
              </div>
            ) : isError ? (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-300">Failed to load users</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#d5b56e]/30">
                  <thead className="bg-[#d5b56e]/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#d5b56e] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5b56e]/10">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-black/40 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                          {u.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                          {u.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingUser(u);
                                setFormData({ name: u.name, email: u.email });
                              }}
                              className="bg-[#d5b56e] hover:bg-[#c19a3d] text-black px-3 py-1 rounded text-xs sm:text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#d5b56e]">
                Edit User: {editingUser.email}
              </h3>
              <button 
                onClick={() => setEditingUser(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/50 border border-[#d5b56e]/30 text-white focus:border-[#d5b56e] focus:ring-1 focus:ring-[#d5b56e]/50"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/50 border border-[#d5b56e]/30 text-white focus:border-[#d5b56e] focus:ring-1 focus:ring-[#d5b56e]/50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded border border-[#d5b56e]/30 text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await updateUser({
                        id: editingUser._id,
                        data: formData,
                      }).unwrap();
                      toast.success("User updated successfully");
                      setEditingUser(null);
                    } catch (err) {
                      toast.error("Update failed");
                      console.error(err);
                    }
                  }}
                  className="px-4 py-2 rounded bg-[#d5b56e] hover:bg-[#c19a3d] text-black font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}