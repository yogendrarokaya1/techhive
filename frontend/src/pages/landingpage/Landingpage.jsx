import React from 'react';
import Slider from 'react-slick'; // Importing react-slick for the carousel
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import './landingpage.css'; // Import custom CSS

const LandingPage = () => {
  // Slick settings for auto-sliding and manual controls
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Auto-play enabled
    autoplaySpeed: 3000, // Time between auto-swipes
    arrows: true, // Show left and right arrows for manual control
  };

  return (
    <div className="landing-page">
      {/* Banner Section */}
      <div className="banner-container">
        <Slider {...settings}>
          <div className="banner-slide">
            <img src="" alt="Banner 1" />
          </div>
          <div className="banner-slide">
            <img src="https://via.placeholder.com/1500x600?text=Banner+2" alt="Banner 2" />
          </div>
          <div className="banner-slide">
            <img src="https://via.placeholder.com/1500x600?text=Banner+3" alt="Banner 3" />
          </div>
        </Slider>
      </div>

      {/* Content Below the Banner */}
      {/* <div className="other-content">
        <h2>Welcome to TechHive</h2>
        <p>Explore the best laptops, gadgets, and more!</p>
        <div className="user-links">
          <a href="/wishlist"><FaHeart /> My Wishlist</a>
          <a href="/cart"><FaShoppingCart /> My Cart</a>
          <a href="/login"><FaUser /> Login</a>
        </div>
      </div> */}

      {/* Add other sections here as needed */}
    </div>
  );
};

export default LandingPage;
