// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import logo from "../assets/golden-logo.png";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-[#f4f4ff] to-[#0915ac]/20 text-[#091636] px-4 sm:px-6 lg:px-12 py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-10">
        <img
          src={logo}
          alt="Ceenami Logo"
          className="w-24 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 h-20 object-contain"
        />

        <div className="space-x-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          <a href="/" className="hover:text-[#d5b56e] transition">Register</a>
          <a href="/dashboard" className="hover:text-[#d5b56e] transition">Dashboard</a>
          <a href="/login" className="hover:text-[#d5b56e] transition">Login</a>
        </div>
      </nav>

      {/* Route Content */}
      <Outlet />
    </div>
  );
}
