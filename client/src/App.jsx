// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/ui/errors/NotFound";
import Loader from "./components/ui/Loader";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUserFromRefreshToken } from "./features/auth/AuthUtils"; // ✅ Import the fixed helper
import Cart from "./pages/Cart";
import ManageProducts from "./pages/admin/ManageProducts";

export default function App() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { authReady } = useSelector((state) => state.auth);

 useEffect(() => {
  const run = async () => {
    console.log("🔄 Checking auth...");
    try {
      await loadUserFromRefreshToken(dispatch);
      console.log("✅ User loaded via refresh token");
    } catch (error) {
      console.error("❌ Refresh token failed", error);
      const hasToken = document.cookie.includes("refreshToken");
      if (hasToken) toast.error("Session expired. Please login again.");
    } finally {
      console.log("✅ Auth check completed");
      setChecked(true);
    }
  };
  run();
}, [dispatch]);

  if (!checked || !authReady) return <Loader />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-[#f4f4ff] to-[#0915ac]/20 text-[#091636] px-4 sm:px-6 lg:px-12 py-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
{/* protected routes */}
        <Route
  path="/cart"
  element={
    <ProtectedRoute allowedRoles={["user"]}>
      <Cart />
    </ProtectedRoute>
  }
/>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
<Route path="/products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </div>
  );
}
