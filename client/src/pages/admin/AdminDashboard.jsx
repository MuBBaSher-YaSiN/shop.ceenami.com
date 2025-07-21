import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useDeleteUserMutation ,useUpdateUserMutation} from "../../features/auth/authApiSlice";
import { useState } from "react";
export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.data || [];
const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
const [updateUser] = useUpdateUserMutation();

const [editingUser, setEditingUser] = useState(null);
const [formData, setFormData] = useState({ name: "", role: "" });
const handleDeleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await deleteUser(userId).unwrap();
    toast.success("User deleted successfully");
  } catch (err) {
    console.error("❌ Failed to delete user", err);
    toast.error("Failed to delete user");
  }
};
  return (
    <>
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
                  <th className="p-3 text-left"></th>
                  <th className="p-3 text-left"></th>
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
      <td className="p-3 flex gap-2">
        <button
  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
  onClick={() => {
    setEditingUser(u);
    setFormData({ name: u.name, role: u.role }); // default role
  }}
>
  ✏️ Edit
</button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => handleDeleteUser(u._id)}
        >
          🗑️ Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        )}
      </main>
    </div>
    {editingUser && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-[#1c1c1c] p-6 rounded-lg w-full max-w-md border border-[#d5b56e]">
      <h3 className="text-xl font-bold mb-4 text-[#d5b56e]">
        Edit User: {editingUser.email}
      </h3>

      <label className="block mb-2 text-sm">Name</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-3 py-2 rounded bg-black border border-gray-600 text-white mb-4"
      />

      <label className="block mb-2 text-sm">Role</label>
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full px-3 py-2 rounded bg-black border border-gray-600 text-white mb-4"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingUser(null)}
          className="bg-gray-600 px-4 py-2 rounded text-white"
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
              toast.success("User updated");
              setEditingUser(null);
            } catch (err) {
              toast.error("Update failed");
              console.error(err);
            }
          }}
          className="bg-[#d5b56e] px-4 py-2 rounded text-black font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
</>
  );
}
