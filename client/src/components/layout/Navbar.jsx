// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/golden-logo.webp";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logout as logoutAction } from "../../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { user, authReady } = useSelector((state) => state.auth);

  if (!authReady) return <div className="h-24 bg-black border-b border-yellow-400/20" />;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="relative bg-black/95 backdrop-blur-md border-b border-yellow-400/20 shadow-lg">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex-shrink-0 group">
            <Link to="/" className="block">
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-[#d5b56e]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={logo}
                  alt="Ceenami Logo"
                  className="relative w-12 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 h-16 sm:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex text-white items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6">
            <Link 
              to="/" 
              className="group relative px-3 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-white hover:text-yellow-400 transition-all duration-300"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-[#d5b56e]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d5b56e] group-hover:w-full transition-all duration-300"></div>
            </Link>

            {!user ? (
              <>
                <Link
                  to="/register"
                  className="group relative px-3 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-white hover:text-yellow-400 transition-all duration-300"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-[#d5b56e]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d5b56e] group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link
                  to="/login"
                  className="group relative px-4 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium bg-gradient-to-r from-[#d5b56e] to-[#705f3b] text-black rounded-lg hover:from-[#705f3b] hover:to-[#a38a52] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/30"
                >
                  <span className="relative z-10">Login</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/cart" 
                  className="group relative px-3 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-yellow-400 hover:text-yellow-300 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 5.2a1 1 0 00.9 1.3h9.8m-10-6h10" />
                    </svg>
                    <span className="hidden sm:inline">Cart</span>
                  </span>
                  <div className="absolute inset-0 bg-[#d5b56e]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                
                <Link
                  to="/dashboard"
                  className="group relative px-3 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-white hover:text-yellow-400 transition-all duration-300"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-[#d5b56e]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d5b56e] group-hover:w-full transition-all duration-300"></div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="group relative px-3 py-2 text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-gray-300 hover:text-red-400 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                  <div className="absolute inset-0 bg-red-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
    </nav>
  );
}