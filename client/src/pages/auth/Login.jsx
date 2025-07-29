import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Login() {
  const { user, authReady } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToast = useRef(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (!authReady) return;

    if (user && !location.state?.fromLogin && !hasShownToast.current) {
      toast.info("You are already logged in.");
      hasShownToast.current = true;
      navigate("/", { replace: true });
    }

    if (location.state?.fromProtected && !hasShownToast.current) {
      toast.info("🔒 Please login or register to continue.");
      hasShownToast.current = true;
    }
  }, [user, authReady, navigate, location]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      const { user, accessToken } = res;
      const role = user.role;

      dispatch(setCredentials({ user, accessToken, role }));
      toast.success("Login successful!");

      const from = location.state?.from || "/";
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate(from);
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#d5b56e]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d5b56e]/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl shadow-lg overflow-hidden">
          {/* Gold accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#d5b56e] via-yellow-600 to-[#d5b56e]"></div>
          
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className=" font-bold text-[#d5b56e] mb-2">Welcome Back</h1>
              <p className="text-white/80">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 font-bold ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#d5b56e] hover:bg-[#c19a3d] text-black'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#d5b56e] hover:underline font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}