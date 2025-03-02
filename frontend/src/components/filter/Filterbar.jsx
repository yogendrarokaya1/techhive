import { useState } from "react";
import "./filterbar.css";

const FilterComponent = ({ setFilteredProducts, laptopList }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([20000, 1000000]);

  const brands = ["Dell", "Acer", "HP", "Asus", "MSI", "Lenovo", "Macbook", "Samsung"];

  // Function to handle brand selection (only one at a time)
  const handleBrandChange = (brand) => {
    const newBrand = selectedBrand === brand ? "" : brand; // Uncheck if already selected
    setSelectedBrand(newBrand);
    filterProducts(newBrand, priceRange); // Apply filter immediately
  };

  // Function to filter products based on selected brand and price range
  const filterProducts = (brand, priceRange) => {
    let filtered = laptopList;

    // Apply brand filter if a brand is selected
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered); // Update the filtered products
  };

  // Function to filter by price range only
  const applyPriceFilter = () => {
    filterProducts(selectedBrand, priceRange);
  };

  return (
    <div className="filter-container">
      <h2>Filter Products</h2>

      {/* Brand Filter (Single Selection with Checkbox) */}
      <div className="filter-item">
        <h4>Brands</h4>
        <div className="brand-checkboxes">
          {brands.map((brand, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedBrand === brand}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter (Input Fields) */}
      <div className="filter-item">
        <label>Price Range (Rs.):</label>
        <div className="price-inputs">
          <p>Min</p>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
            }
            min="0"
            max="1000000"
          />
          <span> - </span>
          <p>Max</p>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value) || 0])
            }
            min="0"
            max="1000000"
          />
        </div>
        <button className="apply-filters-btn" onClick={applyPriceFilter}>
          Filter by Price
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
