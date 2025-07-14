import { Routes, Route, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white px-4 sm:px-6 lg:px-12 py-6">
      <nav className="flex justify-end items-center mb-8 text-yellow-400 hover:text-white text-lg font-medium">
        
        <Link to="/dashboard" className=" hover:underline hover:text-white ">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
