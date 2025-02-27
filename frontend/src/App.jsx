import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Landingpage from "./pages/landingpage/Landingpage";
import LaptopList from "./pages/laptops/Laptoplist";
import GamingLaptopList from "./pages/gaming-laptops/GamingLaptopsList"
import Gadgets from "./pages/gadgets/Gadgets";
import NotebookList from "./pages/notebook/Notebook"
import UltrabookList from "./pages/ultrabook/Ultrabook"
import LaptopDetails from "./pages/laptopdetails/LaptopDetail"
import SearchResult from "./pages/searchpage/SearchPage"
// import Cartlist from "./pages/cart/AddCart"




import UserLogin from "./pages/user-auth/userlogin/UserLogin";
import UserSignup from "./pages/user-auth/usersignup/Usersignup";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import EdituserAccount from "./components/userdashboard-sidebar/EdituserAccount";
import CartList from "./pages/cart/CartList"
import OrderList from "./pages/order/Orderdetail"


// import Cart from "./pages/cart/Cart";
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
        <Route path="/laptops/" element={<LaptopList />} />
        <Route path="/gaming-laptops/" element={<GamingLaptopList />} />
        <Route path="/gadgets/" element={<Gadgets />} />
        <Route path="/notebook/" element={<NotebookList />} />
        <Route path="/ultrabook/" element={<UltrabookList />} />
        <Route path="/laptopdetail/:id" element={<LaptopDetails />} />
        <Route path="/search" element={<SearchResult />} />




        {/* User Routes */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userdashboard-accountinfo" element={<UserDashboard />} />
        <Route path="/edituser-info" element={<EdituserAccount />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/order" element={<OrderList />} />

        {/* <Route path="/cartlist" element={<Cartlist />} /> */}


        
      </Routes>

      {/* Render Footer only for public routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
