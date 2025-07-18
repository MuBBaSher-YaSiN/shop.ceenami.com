// src/components/errors/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-6xl font-bold text-[#d5b56e] mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#d5b56e] text-[#091636] rounded hover:bg-[#c8a956] transition"
      >
        Go Home
      </Link>
    </div>
  );
}
