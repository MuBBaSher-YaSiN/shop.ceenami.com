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
        className="w-full max-w-md p-6 mt-6 bg-black text-white border border-yellow-400 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-yellow-400 text-center mb-4">
          Create New User
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.phone}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-yellow-400 font-semibold rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
