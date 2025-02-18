import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import "./landingpage.css";

import slide1 from "../../media/banner_images/banner-bg.png";
import slide2 from "../../media/banner_images/banner.jpg";
import laptopImage from "../../media/products/laptop.jpg";

const images = [slide1, slide2];

const Landingpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredLaptops, setFeaturedLaptops] = useState([]);
  const [featuredGamingLaptops, setFeaturedGamingLaptops] = useState([]);
  const [featuredGadgets, setFeaturedGadgets] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/products/category/Laptops')
      .then(response => setFeaturedLaptops(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/api/products/category/Gaming Laptops')
      .then(response => setFeaturedGamingLaptops(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/api/products/category/Gadgets')
      .then(response => setFeaturedGadgets(response.data))
      .catch(error => console.error(error));
  }, []);

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

        <button onClick={prevSlide} className="carousel-button carousel-button-left">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="carousel-button carousel-button-right">
          <ChevronRight />
        </button>
      </div>

      <div className="featured-container">
        <div className="featured-heading">
          <h2>Featured Laptops</h2>
          <button className="viewall-btn">View All</button>
        </div>

        <div className="feature-content">
          {featuredLaptops.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.images?.length > 0 ? product.images[0] : laptopImage}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{product.name}
                  <span className="product-model"> | Model {product.modelseries}</span>
                  <span className="product-processor"> | {product.processor} Processor</span>
                  <span className="product-ram"> | {product.ram} RAM</span>
                  <span className="product-storage"> | {product.storage} Storage</span>
                </h3>
                <p className="product-price">Rs {product.price}</p>
                <div className="wishlist">
                  <Heart className="wishlist-icon" />
                  <span>Add to wishlist</span>
                </div>
              </div>
              <div className="addtocart-btn">
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-container">
        <div className="featured-heading">
          <h2>Featured Gaming Laptops</h2>
          <button className="viewall-btn">View All</button>
        </div>
        <div className="feature-content">
          {featuredGamingLaptops.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.images?.length > 0 ? product.images[0] : laptopImage}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{product.name}
                  <span className="product-model"> | Model {product.modelseries}</span>
                  <span className="product-processor"> | {product.processor} Processor</span>
                  <span className="product-ram"> | {product.ram} RAM</span>
                  <span className="product-storage"> | {product.storage} Storage</span>
                </h3>                <p className="product-price">Rs {product.price}</p>
                <div className="wishlist">
                  <Heart className="wishlist-icon" />
                  <span>Add to wishlist</span>
                </div>
              </div>
              <div className="addtocart-btn">
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-container">
        <div className="featured-heading">
          <h2>Featured Gadgets</h2>
          <button className="viewall-btn">View All</button>
        </div>        <div className="feature-content">
          {featuredGadgets.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.images?.length > 0 ? product.images[0] : laptopImage}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{product.name}
                  <span className="product-model"> | {product.modelseries}</span>

                </h3>
                <p className="product-price">Rs {product.price}</p>
                <div className="wishlist">
                  <Heart className="wishlist-icon" />
                  <span>Add to wishlist</span>
                </div>
              </div>
              <div className="addtocart-btn">
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Landingpage;
