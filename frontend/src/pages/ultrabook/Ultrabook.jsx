import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import FilterBar from "../../components/filter/Filterbar";
import "../landingpage/landingpage.css";

const Laptoplist = () => {
  const [sortOrder, setSortOrder] = useState(""); // Sorting state
  const [laptopList, setLaptopList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Number of products per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/laptoplist/Ultrabook")
      .then((response) => {
        setLaptopList(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      })
      .catch((error) => console.error(error));
  }, []);

  // Sorting function
  const sortedLaptops = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price; // Low to High
    else if (sortOrder === "desc") return b.price - a.price; // High to Low
    return 0;
  });

  // Pagination: Get current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedLaptops.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle Next & Previous Page
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedLaptops.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Wishlist function
  const handleAddToWishlist = async (productId) => {
    const token = localStorage.getItem("userToken"); // Get the JWT token

    if (!token) {
      navigate("/userlogin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cartlist/add",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token
        }
      );

      alert(response.data.success ? "Product added to wishlist!" : "Failed to add product to wishlist.");
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
              <h2>Ultrabook</h2>
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
              {currentProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.images?.length > 0 ? product.images[0] : "/default-image.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info" onClick={() => navigate(`/laptopdetail/${product.id}`)}>
                  {product.stock > 0 ? (
                      <span className="in-stock">In Stock</span>
                    ) : (
                      <span className="out-of-stock">Out of Stock</span>
                    )}
                    <h3 className="product-title">
                      {product.name}
                      <span className="product-model"> | Model {product.modelseries}</span>
                      <span className="product-processor"> | {product.processor} Processor</span>
                      <span className="product-ram"> | {product.ram} RAM</span>
                      <span className="product-storage"> | {product.storage} Storage</span>
                    </h3>
                    <p className="product-price">Rs {product.price}</p>
                  </div>

                  <div className="addtocart-btn">
                    <button onClick={() => handleAddToWishlist(product.id)} disabled={product.stock <= 0}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(sortedLaptops.length / productsPerPage)}
              </span>
              <button onClick={nextPage} disabled={currentPage >= Math.ceil(sortedLaptops.length / productsPerPage)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Laptoplist;
