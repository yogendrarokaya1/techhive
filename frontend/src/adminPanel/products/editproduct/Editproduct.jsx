import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../adminnavbar/Adminnavbar";
import Sidebar from "../../adminsidebar/Adminsidebar";
import "./editProduct.css";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        }
    }, [navigate]);

    const [productDetails, setProductDetails] = useState({
        name: "",
        modelseries: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        processor: "",
        ram: "",
        storage: "",
        screenSize: "",
        os: "",
        images: [],
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                const data = response.data;
                setProductDetails({
                    name: data.name,
                    modelseries: data.modelseries,
                    description: data.description,
                    category: data.category,
                    brand: data.brand,
                    price: data.price,
                    stock: data.stock,
                    processor: data.processor,
                    ram: data.ram,
                    storage: data.storage,
                    screenSize: data.screenSize,
                    os: data.os,
                    images: [],
                });
                setExistingImages(data.images);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
    };

    const handleRemoveImage = (img) => {
        setImagesToRemove((prev) => [...prev, img]); // Track removed images
        setExistingImages((prev) => prev.filter((image) => image !== img)); // Update UI
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(productDetails).forEach((key) => {
            formData.append(key, productDetails[key]);
        });

        // Append new images
        newImages.forEach((image) => {
            formData.append("images", image);
        });

        // Append removed images
        formData.append("imagesToRemove", JSON.stringify(imagesToRemove));

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                alert("Product updated successfully!");
                navigate("/admin/");
            }
        } catch (error) {
            alert("Error updating product");
        }
    };

    return (
        <div className="edit-product-container" style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", width: "100%" }}>
                <AdminNavbar />
                <div style={{ padding: "50px" }}>
                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit} className="edit-product-form" encType="multipart/form-data">
                        <label>Product Name:</label>
                        <input type="text" name="name" value={productDetails.name} onChange={handleChange} required />

                        <label>Model Series:</label>
                        <input type="text" name="modelseries" value={productDetails.modelseries} onChange={handleChange} required />

                        <label>Description:</label>
                        <textarea name="description" value={productDetails.description} onChange={handleChange} required />

                        <label>Category:</label>
                        <select name="category" value={productDetails.category} onChange={handleChange} required>
                            <option value="Laptops">Laptops</option>
                            <option value="Gaming Laptops">Gaming Laptops</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Notebook">Notebook</option>
                            <option value="Ultrabook">Ultrabook</option>
                        </select>

                        <label>Brand:</label>
                        <select name="brand" value={productDetails.brand} onChange={handleChange} required>
                            <option value="Dell">Dell</option>
                            <option value="Acer">Acer</option>
                            <option value="HP">HP</option>
                            <option value="Asus">Asus</option>
                            <option value="MSI">MSI</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="Macbook">Macbook</option>
                            <option value="Samsung">Samsung</option>
                        </select>

                        <label>Price:</label>
                        <input type="number" name="price" value={productDetails.price} onChange={handleChange} required />

                        <label>Stock Quantity:</label>
                        <input type="number" name="stock" value={productDetails.stock} onChange={handleChange} required />

                        <label>RAM:</label>
                        <input type="text" name="ram" value={productDetails.ram} onChange={handleChange} required />

                        <label>Storage:</label>
                        <input type="text" name="storage" value={productDetails.storage} onChange={handleChange} required />

                        <label>Screen Size:</label>
                        <input type="text" name="screenSize" value={productDetails.screenSize} onChange={handleChange} required />

                        <label>Operating System:</label>
                        <input type="text" name="os" value={productDetails.os} onChange={handleChange} required />

                        <label>Existing Images:</label>
                        <div className="image-previews">
                            {existingImages.map((img, index) => (
                                <div key={index} className="image-container">
                                    <img src={img} alt={`preview ${index}`} className="image-preview" />
                                    <button type="button" onClick={() => handleRemoveImage(img)} className="remove-image-btn">
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label>New Images:</label>
                        <input type="file" name="images" multiple onChange={handleImageChange} />

                        <button className="update-btn" type="submit">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
