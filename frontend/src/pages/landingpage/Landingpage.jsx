import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./landingpage.css"

import slide1 from "../../media/banner_images/banner-bg.png";
import slide2 from "../../media/banner_images/banner.jpg";
import laptopImage from "../../media/products/laptop.jpg";

import { Heart } from "lucide-react";
// import slide3 from "../assets/slide3.jpg";

const images = [slide1, slide2];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="carousel-image"
            />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button onClick={prevSlide} className="carousel-button carousel-button-left">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="carousel-button carousel-button-right">
          <ChevronRight />
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Feature products */}
      <div className="featured-container" >
        <h1>Featured Products</h1>
        <div className="feature-content">
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
      </div>
      </div>



      {/* Feature products */}
      <div className="featured-container" >
        <h1>Dell Product</h1>
        <div className="feature-content">
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src={laptopImage} alt="Acer Predator Neo 16" className="product-image" />
          <div className="product-info">
            <h3 className="product-title">
              Acer Predator Neo 16 – i9 14900Hx | 32GB DDR5 | 1TB SSD | RTX 4060 8GB
            </h3>
            <p className="product-price">Rs 198,800.00</p>
            <div className="wishlist">
              <Heart className="wishlist-icon" />
              <span>Add to wishlist</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Carousel;