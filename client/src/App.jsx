import { Routes, Route, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
// import logo from './assets/Black-logo.png';
// import logo from './assets/Blue-logo.png';
import logo from './assets/golden-logo.png';


export default function App() {
  return (
<div className="min-h-screen w-full bg-gradient-to-br from-white via-[#f4f4ff] to-[#0915ac]/20 text-[#091636] px-4 sm:px-6 lg:px-12 py-6">
     <nav className="flex justify-between items-center mb-10">
<img
  src={logo}
  alt="Ceenami Logo"
  className="w-24 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 h-20 object-contain"
/>

  <div className="space-x-4 text-xs sm:text-sm md:text-base  lg:text-lg xl:text-xl font-medium">
  <Link to="/" className="text-[#091636] hover:text-[#d5b56e] transition">User Form</Link>
  <Link to="/dashboard" className="text-[#091636] hover:text-[#d5b56e] transition">Dashboard</Link>
</div>

</nav>



      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
