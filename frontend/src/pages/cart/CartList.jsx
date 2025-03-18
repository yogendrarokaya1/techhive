// src/pages/Wishlist.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/userdashboard-sidebar/Usersidebar";

import "../landingpage/landingpage.css";
import "./cartlist.css";



const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist data
    const fetchWishlist = async () => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            navigate("/userlogin");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/api/cartlist", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setWishlist(response.data.data);
            } else {
                alert("Failed to fetch cart.");
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Fetch wishlist on component mount
    useEffect(() => {
        fetchWishlist();
    }, [navigate]);

    // Remove product from wishlist
    const handleRemoveFromWishlist = async (productId) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            alert("Please log in to manage your wishlist.");
            navigate("/userlogin");
            return;
        }

        try {
            const response = await axios.delete(
                "http://localhost:5000/api/cartlist/remove",
                {
                    data: { productId }, // Send productId in the request body
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Product removed from cartlist.");
                fetchWishlist(); // Refresh the wishlist
            } else {
                alert("Failed to remove product from cartlist.");
            }
        } catch (error) {
            console.error("Error removing from cartlist:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="wishlist-container">
            <UserSidebar />

            {/* {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : ( */}
            <div className="feature-content">
                {wishlist.map((product) => (
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
                        <div className="checkout-btn">
                            <button onClick={() => navigate(`/laptopdetail/${product.id}`)} disabled={product.stock <= 0}>Checkout</button>
                        </div>
                        <div className="remove-btn">
                            <button onClick={() => handleRemoveFromWishlist(product.id)}>Remove Item</button>
                        </div>
                        
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Wishlist;