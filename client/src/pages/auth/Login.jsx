// src/pages/auth/Login.js
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
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
      toast.info("✅ You are already logged in.");
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
    toast.success("✅ Login successful!");

    // 🔁 Redirection logic
    const from = location.state?.from || "/";
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate(from); // go back to original route (e.g. /products/:id)
    } else {
      navigate("/unauthorized");
    }
  } catch (err) {
    toast.error(err?.data?.message || "❌ Login failed");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-12  font-arkhip">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg shadow-xl rounded-lg w-full max-w-md px-6 py-8 space-y-6 border border-[#d5b56e]/30"
      >
        <h2 className="text-3xl font-bold text-center text-[#d5b56e]">Login</h2>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#d5b56e] hover:underline transition duration-200"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
