import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../adminnavbar/Adminnavbar";
import Sidebar from "../../adminsidebar/Adminsidebar";
import "./addproduct.css";

const AddProduct = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        }
    }, [navigate]);

    const [productDetails, setProductDetails] = useState({
        name: "",
        modelseries: "",
        description: "",
        category: "Laptops",
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

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        const newFiles = e.target.files;
        setProductDetails((prevDetails) => {
            const updatedImages = [...prevDetails.images, ...newFiles];
            return { ...prevDetails, images: updatedImages };
        });

        // Generate previews for the selected images
        const previews = [];
        Array.from(newFiles).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                if (previews.length === newFiles.length) {
                    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(productDetails).forEach((key) => {
            if (key === "images") {
                Array.from(productDetails.images).forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, productDetails[key]);
            }
        });

        try {
            const response = await axios.post("http://localhost:5000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                alert("Product added successfully!");
                setProductDetails({
                    name: "",
                    modelseries: "",
                    description: "",
                    category: "Laptops",
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
                setImagePreviews([]); // Reset image previews
            }
        } catch (error) {
            alert("Error adding product");
        }
    };

    return (
        <div className="addproduct-container" style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", width: "100%" }}>
                <AdminNavbar />
                <div style={{ padding: "50px" }}>
                    <h2>Add New Laptop Product</h2>
                    <form onSubmit={handleSubmit} className="addproduct-form" encType="multipart/form-data">
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

                        <label>Processor:</label>
                        <input type="text" name="processor" value={productDetails.processor} onChange={handleChange} required />
                        <label>Memory:</label>
                        <input type="text" name="ram" value={productDetails.ram} onChange={handleChange} required />

                        <label>Storage:</label>
                        <input type="text" name="storage" value={productDetails.storage} onChange={handleChange} required />

                        <label>Screen Size:</label>
                        <input type="text" name="screenSize" value={productDetails.screenSize} onChange={handleChange} required />

                        <label>Operating System:</label>
                        <input type="text" name="os" value={productDetails.os} onChange={handleChange} required />

                        <label>Images:</label>
                        <input type="file" name="images" multiple onChange={handleImageChange} required />

                        {/* Display selected images */}
                        <div className="image-previews">
                            {imagePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`preview ${index}`}
                                    className="image-preview"
                                />
                            ))}
                        </div>

                        <button className="add-btn" type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
