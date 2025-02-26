import { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import FilterBar from "../../components/filter/Filterbar";
import "../landingpage/landingpage.css";

const Laptoplist = () => {
  const [sortOrder, setSortOrder] = useState(""); // State for sorting order
  const [laptopList, setLaptopList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/laptoplist/Laptops")
      .then((response) => {
        setLaptopList(response.data);
        setFilteredProducts(response.data); // Initialize filtered products with all products
      })
      .catch((error) => console.error(error));
  }, []);

  // Sorting function
  const sortedLaptops = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price; // Sort Low to High
    } else if (sortOrder === "desc") {
      return b.price - a.price; // Sort High to Low
    }
    return 0;
  });
  const handleAddToWishlist = async (productId) => {
    const token = localStorage.getItem("userToken"); // Get the JWT token from localStorage

    if (!token) {
      navigate("/userlogin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.data.success) {
        alert("Product added to wishlist!");
      } else {
        alert("Failed to add product to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="laptoplist-container" style={{ display: "flex" }}>
        <FilterBar setFilteredProducts={setFilteredProducts} laptopList={laptopList} />
        <div style={{ marginLeft: "25px", width: "100%" }}>
          <div className="featured-container">
            <div className="featured-heading">
              <h2>Laptops</h2>
              {/* Sort By Price Filter */}
              <div className="filter-item">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="">Sort By :</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </div>

            <div className="feature-content">
              {sortedLaptops.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.images?.length > 0 ? product.images[0] : laptopImage}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info" onClick={() => navigate(`/laptopdetail/${product.id}`)} >
                    <h3 className="product-title">{product.name}
                      <span className="product-model"> | Model {product.modelseries}</span>
                      <span className="product-processor"> | {product.processor} Processor</span>
                      <span className="product-ram"> | {product.ram} RAM</span>
                      <span className="product-storage"> | {product.storage} Storage</span>
                    </h3>
                    <p className="product-price">Rs {product.price}</p>
                  </div>

                  <div className="addtocart-btn">
                <button onClick={() => handleAddToWishlist(product.id)}>Add to Cart</button>
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Laptoplist;
