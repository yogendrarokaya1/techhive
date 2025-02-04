import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./footer.css"; // Import the CSS for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are a tech store offering the best laptops, gadgets, and accessories. Find your perfect tech solutions with us!</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/brands">Laptops by Brand</Link></li>
            <li><Link to="/gaming-laptops">Gaming Laptops</Link></li>
            <li><Link to="/gadgets">Gadgets</Link></li>
            
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@techhive.com</p>
          <p>Phone: 123-456-7890</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <Link to="#"><FaFacebook size={24} /></Link>
            <Link to="#"><FaInstagram size={24} /></Link>
            <Link to="#"><FaTwitter size={24} /></Link>
            <Link to="#"><FaLinkedin size={24} /></Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 TechHive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
