import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(`http://localhost:5000/api/search/search?query=${query}`);
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="feature-content">
        {results.map((product) => (
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
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
