import { useEffect, useState } from "react";
import { getUsers } from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start mt-6">
      <div className="w-full max-w-screen-xl bg-black text-white p-6 rounded-xl border border-yellow-400 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Admin Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-600">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-700 hover:bg-gray-800">
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
