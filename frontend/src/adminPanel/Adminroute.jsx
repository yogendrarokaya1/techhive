// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin-auth/login/AdminLogin";
import AdminSignup from "./admin-auth/signup/AdminSignup";
import Dashboard from "./Dashboard";
import Addproduct from "./products/addproduct/Addproduct"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addproduct" element={<Addproduct />} />

      
    </Routes>
  );
};

export default AdminRoutes;
