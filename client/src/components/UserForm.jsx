import { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("User created successfully!");
      setFormData({ name: "", email: "", password: "", phone: "" });
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating user.");
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


        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"

  className="w-full text-xs sm:text-sm md:text-base px-3 py-2 sm:p-3 rounded bg-white/90 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5b56e]"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"

  className="w-full px-3 py-2 sm:p-3 text-xs sm:text-sm md:text-base rounded bg-white/90 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5b56e]"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"

  className="w-full px-3 py-2 sm:p-3 text-xs sm:text-sm md:text-base rounded bg-white/90 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5b56e]"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone"

  className="w-full px-3 py-2 sm:p-3 text-xs sm:text-sm md:text-base rounded bg-white/90 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5b56e]"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Submit */}
        
        <button
  className="w-full py-2 sm:py-3 bg-[#d5b56e] text-xs sm:text-sm md:text-base hover:bg-[#b79a53] text-black  font-semibold rounded transition"
>
  Submit
</button>

      </form>
    </div>
  );
}
