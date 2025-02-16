import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Landingpage from "./pages/landingpage/Landingpage";
// import ProductDetail from "./pages/productdetail/ProductDetail";
import Gadgets from "./pages/gadgets/Gadgets";
// import Login from "./pages/user-auth/login/Login";
// import UserDashboard from "./pages/user-dashboard/UserDashboard";
// import Cart from "./pages/cart/Cart";
// import Wishlist from "./pages/wishlist/Wishlist";
import AdminRoutes from "./adminPanel/Adminroute";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

// Layout component for conditional rendering of Navbar and Footer
const Layout = () => {
  const location = useLocation();

  // Check if the current route is for the admin panel
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Render Navbar and Footer only for public routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        {/* <Route path="/product/" element={<ProductDetail />} /> */}
        <Route path="/gadgets" element={<Gadgets />} />
        
        {/* User Routes
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} /> */}
      </Routes>

      {/* Render Footer only for public routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
