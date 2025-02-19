import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css"; // Import CSS file
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"; 
import logo from "../../assets/logotechhive.png"; 

const Navbar = ({ onUserLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation(); 
  const navigate = useNavigate(); 

  // Check if user is logged in when the component loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user name if present in localStorage
    }
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
 

    window.addEventListener("storage", handleStorageChange);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setUser(null);

    // Trigger storage event to update other components
    window.dispatchEvent(new Event("storage"));

    navigate("/userlogin");
  };

  return (
    <header>
      {/* First Row */}
      <div className="top-bar">
        <Link to="/" className="logo">
          <img src={logo} alt="TechHive Logo" className="logo-img" />
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="Search for laptops, brands..." />
          <button>🔍</button>
        </div>

        <div className="user-links">
          <Link to="/wishlist">
            <FaHeart /> My Wishlist
          </Link>
          <Link to="/cart">
            <FaShoppingCart /> My Cart
          </Link>
          <Link to="/userdashboard">
            <FaUser /> My Account
          </Link>
          {user ? (
            
            // If user is logged in, show username & logout button
            <div className="user-dropdown">
              
              
              <span className="username">Welcome {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in, show login link
            <Link to="/userlogin">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Second Row */}
      <nav className="navbar">
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/laptops" className={location.pathname === "/laptops" ? "active" : ""}>
              Laptops
            </Link>
          </li>
          <li>
            <Link to="/gaming-laptops" className={location.pathname === "/gaming-laptops" ? "active" : ""}>
              Gaming Laptops
            </Link>
          </li>
          <li>
            <Link to="/gadgets" className={location.pathname === "/gadgets" ? "active" : ""}>
              Gadgets
            </Link>
          </li>
          <li>
            <Link to="/notebook" className={location.pathname === "/notebook" ? "active" : ""}>
              Notebook
            </Link>
          </li>
          <li>
            <Link to="/ultrabook" className={location.pathname === "/ultrabook" ? "active" : ""}>
              Ultrabook
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
