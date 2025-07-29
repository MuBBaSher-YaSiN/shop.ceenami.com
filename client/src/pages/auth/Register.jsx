import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      toast.success("User registered successfully!");
      setFormData({ name: "", email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d5b56e]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d5b56e]/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl shadow-lg overflow-hidden">
          {/* Gold accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#d5b56e] via-yellow-600 to-[#d5b56e]"></div>
          
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#d5b56e] mb-2">Create Account</h1>
              <p className="text-white/80">Join our exclusive community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {["name", "email", "password"].map((field) => (
                  <Input
                    key={field}
                    type={field === "password" ? "password" : field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 focus:border-[#d5b56e] text-black"
                  />
                ))}
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
                    Creating Account...
                  </span>
                ) : 'Register'}
              </Button>

              {isError && (
                <p className="text-red-400 text-sm text-center">
                  {error?.data?.message || "Registration failed. Please try again."}
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#d5b56e] hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}