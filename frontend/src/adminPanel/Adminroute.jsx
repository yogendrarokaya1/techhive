// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin-auth/login/AdminLogin";
import AdminSignup from "./admin-auth/signup/AdminSignup";
import Dashboard from "./Dashboard";
import ListProduct from "./products/ProductList";
import AddProduct from "./products/addproduct/Addproduct";
import EditProduct from './products/editproduct/Editproduct'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/listproduct" element={<ListProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />      
      
    </Routes>
  );
};

export default AdminRoutes;
