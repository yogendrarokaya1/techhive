import { useState, useEffect } from "react";
import axios from "axios";
import "./landingpage.css"; // Make sure to create a corresponding CSS file

const LandingPage = () => {
    const [laptops, setLaptops] = useState([]);
    const [gamingLaptops, setGamingLaptops] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/latest-products")
            .then(response => {
                setLaptops(response.data.laptops);
                setGamingLaptops(response.data.gamingLaptops);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            {/* Latest Laptops Section */}
            <div className="featured-container">
                <h1>Latest Laptops</h1>
                <div className="product-list">
                    {laptops.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-price">Rs {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest Gaming Laptops Section */}
            <div className="featured-container">
                <h1>Latest Gaming Laptops</h1>
                <div className="product-list">
                    {gamingLaptops.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-price">Rs {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
