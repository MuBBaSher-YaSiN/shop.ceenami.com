import { useEffect, useState } from "react";
import { getUsers } from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6">
      <div className="w-full max-w-screen-xl bg-white/5 backdrop-blur-md text-white p-6 rounded-xl border border-[#d5b56e] shadow-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d5b56e] mb-6 text-center">
  Admin Dashboard
</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700">
            <thead className="bg-[#d5b56e] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t text-gray-600 border-gray-700 hover:bg-white/10 transition">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
