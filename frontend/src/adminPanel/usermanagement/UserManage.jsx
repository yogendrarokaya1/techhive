// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminnavbar/Adminnavbar";
import Sidebar from "../adminsidebar/Adminsidebar";
import "../products/productList.css";

const ProductList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    // Fetch all products when component mounts
    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        } else {
            const fetchUsers = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/user/allusers");
                    const data = await response.json();
                    setCustomers(data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            fetchUsers();
        }
    }, [navigate]);

    // Handle Delete Product
    // const handleDelete = async (id) => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    //     if (!confirmDelete) return;

    //     try {
    //         const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    //         if (response.ok) {
    //             setProducts(products.filter(product => product.id !== id));  // Remove deleted product from the list
    //         } else {
    //             alert("Failed to delete product.");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting product:", error);
    //     }
    // };

    // Handle Edit Product (Redirect to Edit Page)
    // const handleEdit = (id) => {
    //     navigate(`/admin/edit-product/${id}`);
    // };



    return (
        <div className="product-list-container">
            <Sidebar />
            <div className="product-list-content">
                <AdminNavbar />
                <div className="addproduct-content">
                    <h1 className="product-list-title">Users List</h1>
                </div>
                <table className="product-list-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>User Name</th>
                            <th>Contact</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>

                                <td>{user.name}</td>
                                <td>{user.contact}</td>
                                <td>{user.email}</td>

                                {/* <td className="product-actions">
                                    <button onClick={() => handleEdit(product.id)} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
