import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
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
    <div className="flex justify-center items-start min-h-[80vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-6 p-6 bg-white/10 backdrop-blur-md text-white border border-[#d5b56e] rounded-xl shadow-2xl space-y-4"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#d5b56e] text-center mb-4">
          Create New User
        </h2>

        {["name", "email", "password"].map((field) => (
          <Input
            key={field}
            type={field === "password" ? "password" : field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
          />
        ))}

        <Button disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>

        {isError && (
          <p className="text-red-400 text-sm text-center mt-2">
            {error?.data?.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
}
