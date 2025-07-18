// src/routes/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, role, authReady } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!authReady) return <Loader />; // ✅ Wait until auth is ready

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, fromProtected: true }}
      />
    );
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
