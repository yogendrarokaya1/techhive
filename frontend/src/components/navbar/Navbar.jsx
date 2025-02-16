import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./navbar.css"; // Import CSS file
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"; 
import logo from "../../assets/logotechhive.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

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
          <Link to="/login">
            <FaUser /> Login
          </Link>
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
          <li className="dropdown">
            <button className="dropbtn">Laptops by Brand</button>
            <ul className="dropdown-content">
              <li>
                <Link to="/brands/apple" className={location.pathname === "/brands/apple" ? "active" : ""}>Dell</Link>
              </li>
              <li>
                <Link to="/brands/dell" className={location.pathname === "/brands/dell" ? "active" : ""}>Acer</Link>
              </li>
              <li>
                <Link to="/brands/hp" className={location.pathname === "/brands/hp" ? "active" : ""}>HP</Link>
              </li>
              <li>
                <Link to="/brands/asus" className={location.pathname === "/brands/asus" ? "active" : ""}>Asus</Link>
              </li>
              <li>
                <Link to="/brands/asus" className={location.pathname === "/brands/asus" ? "active" : ""}>MSI</Link>
              </li>
              <li>
                <Link to="/brands/asus" className={location.pathname === "/brands/asus" ? "active" : ""}>Lenovo</Link>
              </li>
              <li>
                <Link to="/brands/asus" className={location.pathname === "/brands/asus" ? "active" : ""}>Apple</Link>
              </li>
              <li>
                <Link to="/brands/asus" className={location.pathname === "/brands/asus" ? "active" : ""}>Samsung</Link>
              </li>
            </ul>
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
            <Link to="/gadgets" className={location.pathname === "/gadgets" ? "active" : ""}>
              Notebook
            </Link>
          </li>

          <li>
            <Link to="/gadgets" className={location.pathname === "/gadgets" ? "active" : ""}>
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
