// src/app/App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/ui/errors/NotFound";
import Loader from "./components/ui/Loader";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import { useLazyRefreshTokenQuery } from "./features/auth/authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [triggerRefresh, { isLoading }] = useLazyRefreshTokenQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await triggerRefresh().unwrap();
        if (result?.data?.accessToken) {
          dispatch(setCredentials({
            accessToken: result.data.accessToken,
            user: result.data.user,
            role: result.data.user.role,
          }));
        }
      } catch (error) {
        const hasToken = document.cookie.includes("refreshToken");
        if (hasToken) toast.error("Session expired. Please login again.");
      } finally {
        setChecked(true);
      }
    };

    checkAuth();
  }, [dispatch, triggerRefresh]);

  const { authReady } = useSelector((state) => state.auth);
if (!checked || isLoading || !authReady) return <Loader />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-[#f4f4ff] to-[#0915ac]/20 text-[#091636] px-4 sm:px-6 lg:px-12 py-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        {/* Protected */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
