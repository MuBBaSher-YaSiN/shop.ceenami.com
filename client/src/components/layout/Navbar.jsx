// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/golden-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logout as logoutAction } from "../../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { user, authReady } = useSelector((state) => state.auth);

  if (!authReady) return null; // or a minimal placeholder like <div className="h-20" />

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex justify-between items-center mb-2">
      <img
        src={logo}
        alt="Ceenami Logo"
        className="w-24 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 h-20 object-contain"
      />
      <div className="space-x-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium">
        <Link
              to="/"
              className="text-[#091636] hover:text-[#d5b56e] transition"
            >
              Home
            </Link>
        {!user ? (
          <>
            <Link
              to="/register"
              className="text-[#091636] hover:text-[#d5b56e] transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-[#091636] hover:text-[#d5b56e] transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
        
<Link to="/cart" className="text-[#d5b56e] hover:underline">
  View Cart
</Link>
            <Link
              to="/dashboard"
              className="text-[#091636] hover:text-[#d5b56e] transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#091636] hover:text-red-500 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
