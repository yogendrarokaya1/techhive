import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Landingpage from "./pages/landingpage/Landingpage";
import Gadgets from "./pages/gadgets/Gadgets";
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
        <Route path="/gadgets" element={<Gadgets />} />
      </Routes>

      {/* Render Footer only for public routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
