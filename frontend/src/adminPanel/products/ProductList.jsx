import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminnavbar/Adminnavbar";
import Sidebar from "../adminsidebar/Adminsidebar";
import "./productList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch all products when component mounts
    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        } else {
            const fetchProducts = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/products");
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            fetchProducts();
        }
    }, [navigate]);

    // Handle Delete Product
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
            if (response.ok) {
                setProducts(products.filter(product => product.id !== id));  // Remove deleted product from the list
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Handle Edit Product (Redirect to Edit Page)
    const handleEdit = (id) => {
        navigate(`/admin/edit-product/${id}`);
    };

    // Handle Add Product
    const handleAddProduct = () => {
        navigate("/admin/add-product");
    };

    return (
        <div className="product-list-container">
            <Sidebar />
            <div className="product-list-content">
                <AdminNavbar />
                <div className="addproduct-content">
                    <h1 className="product-list-title">Product List</h1>
                    <button className="add-btn" onClick={handleAddProduct}>Add Product</button>
                </div>
                <table className="product-list-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Model Series</th>
                            <th>Stock</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.modelseries || "N/A"}</td>
                                <td>
                                    <span className="stock-number">{product.stock}</span>{" "}
                                    {product.stock > 0 ? (
                                        <span className="in-stock">(In Stock)</span>
                                    ) : (
                                        <span className="out-of-stock">(Out of Stock)</span>
                                    )}
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>Rs. {product.price}</td>
                                <td className="product-actions">
                                    <button onClick={() => handleEdit(product.id)} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;