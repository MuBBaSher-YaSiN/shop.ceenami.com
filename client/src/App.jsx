// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/ui/errors/NotFound";
import Loader from "./components/ui/Loader";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUserFromRefreshToken } from "./features/auth/AuthUtils"; //  Import the fixed helper
import Cart from "./pages/Cart";
import ManageProducts from "./pages/admin/ManageProducts";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageLeads from "./pages/admin/ManageLeads";
import { useGetProductsQuery } from "./features/products/productApiSlice";
import NewNav from "./components/layout/NewNav";
import Footer from "./components/layout/footer";
export default function App() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { authReady } = useSelector((state) => state.auth);
  const { data: productsData } = useGetProductsQuery();
  const products = productsData?.data || [];
  // const products = []; //For testing empty state

  useEffect(() => {
    const run = async () => {
      console.log("🔄 Checking auth...");
      try {
        await loadUserFromRefreshToken(dispatch);
        console.log(" User loaded via refresh token");
      } catch (error) {
        console.error(" Refresh token failed", error);
        const hasToken = document.cookie.includes("refreshToken");
        if (hasToken) toast.error("Session expired. Please login again.");
      } finally {
        console.log(" Auth check completed");
        setChecked(true);
      }
    };
    run();
  }, [dispatch]);

  //  Don't render anything until fully checked
  if (!checked || !authReady) return <Loader message="Initializing..." />;

  return (
    <div className="min-h-screen w-full text-[#091636] ">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Only show Navbar when there are products */}
      {products.length > 0 ? <Navbar /> : <NewNav />}

      {/*  Only render Routes AFTER auth is ready */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Restrict all other routes when no products */}
        {products.length > 0 ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            {/*  Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/orders" element={<ManageOrders />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/leads" element={<ManageLeads />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/products" element={<ManageProducts />} />
            </Route>
          </>
        ) : (
          //  If products empty, redirect all unknown paths to Home
          <Route path="*" element={<Home />} />
        )}
      </Routes>
      {/* Only show footer when products are present */}
      {products.length > 0 && <Footer />}
    </div>
  );
}
