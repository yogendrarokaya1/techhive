import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.css"; // Import CSS file
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logotechhive.png";

const Navbar = ({ onUserLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    window.dispatchEvent(new Event("storage"));
    navigate("/userlogin");
  };

  // Fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/search/search?query=${query}`);
      setSuggestions(response.data.slice(0, 5)); // Show only top 5 results
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header>
      {/* First Row */}
      <div className="top-bar">
        <Link to="/" className="logo">
          <img src={logo} alt="TechHive Logo" className="logo-img" />
        </Link>

        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
              type="text"
              placeholder="Search for laptops, brands..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">🔍</button>
          </form>

          {/* Display suggestions */}
          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((product) => (
                <li key={product.id} onClick={() => navigate(`/laptopdetail/${product.id}`)} className="product-suggestion">
                  <div className="search-content">
                    <div className="search-image">
                      <img
                        src={product.images?.length > 0 ? product.images[0] : laptopImage}
                        alt={product.name}
                        className="s"
                      />
                    </div>
                    <div className="search-info">
                      <h5>{product.name} | {product.brand} | {product.modelseries} | {product.category} | </h5>

                    </div>
                    <div className="search-price">
                      <h5> Rs. {product.price}</h5>
                    </div>
                  </div>
                </li>

              ))}
            </ul>
          )}
        </div>

        <div className="user-links">
          
          <Link to="/cartlist">
            <FaShoppingCart /> My Cart
          </Link>
          <Link to="/userdashboard-accountinfo">
            <FaUser /> My Account
          </Link>
          {user ? (
            <div className="user-dropdown">
              <span className="username">Welcome</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
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
            <Link to="/notebook" className={location.pathname === "/notebook" ? "active" : ""}>
              Notebook
            </Link>
          </li>
          <li>
            <Link to="/ultrabook" className={location.pathname === "/ultrabook" ? "active" : ""}>
              Ultrabook
            </Link>
          </li>
          <li>
            <Link to="/gadgets" className={location.pathname === "/gadgets" ? "active" : ""}>
              Gadgets
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
