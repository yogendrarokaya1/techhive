// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin-auth/login/AdminLogin";
import AdminSignup from "./admin-auth/signup/AdminSignup";
import Dashboard from "./Dashboard";
import ListProduct from "./products/ProductList";
import AddProduct from "./products/addproduct/Addproduct";
import EditProduct from './products/editproduct/Editproduct'
import OrderManage from './products/manageorder/OrderManage'
import UserManage from "./usermanagement/UserManage"


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLogin />} />
      <Route path="/adminsignup" element={<AdminSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/listproduct" element={<ListProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} /> 
      <Route path="/adminorder/" element={<OrderManage />} />
      <Route path="/usermanage/" element={<UserManage />} />      
      
     
      
    </Routes>
  );
};

export default AdminRoutes;
