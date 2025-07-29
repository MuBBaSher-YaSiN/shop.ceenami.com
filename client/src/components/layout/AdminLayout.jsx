// components/layout/AdminLayout.jsx
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 w-full bg-black/70 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-4">
            <h1 className="text-xl font-bold mb-6 text-[#d5b56e] border-b border-[#d5b56e]/30 pb-3">
              Admin Panel
            </h1>
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
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}