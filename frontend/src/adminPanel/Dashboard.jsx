import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./adminnavbar/Adminnavbar";
import AdminSidebar from "./adminsidebar/Adminsidebar";
import axios from "axios";
import "./dashboard.css"; // Add CSS for styling

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalSoldQuantity, setTotalSoldQuantity] = useState(0);

    useEffect(() => {
        // Redirect to login page if there's no token in localStorage
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        } else {
            // Fetch dashboard data
            fetchDashboardData();
        }
    }, [navigate]);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("adminToken");

        try {
            const response = await axios.get("http://localhost:5000/api/admin/dashboard-data", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Backend Response:", response.data); // Debugging

            if (response.data.success) {
                setTotalUsers(response.data.totalUsers);
                setTotalProducts(response.data.totalProducts);
                setTotalSales(response.data.totalSales || 0); // Fallback to 0 if null/undefined
                setTotalSoldQuantity(response.data.totalSoldQuantity);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const totalSalesValue = typeof totalSales === "number" ? totalSales : 0;

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <AdminSidebar />

            <div style={{ marginLeft: "250px", width: "100%" }}>
                <AdminNavbar />
                <div style={{ padding: "20px" }}>
                    <h2>Welcome to the Admin Dashboard</h2>

                    {/* Dashboard Cards */}
                    <div className="dashboard-cards">
                        <div className="card">
                            <h3>Total Users</h3>
                            <p>{totalUsers}</p>
                        </div>
                        <div className="card">
                            <h3>Total Products</h3>
                            <p>{totalProducts}</p>
                        </div>
                        <div className="card">
                            <h3>Total Sales</h3>
                            <p>Rs {totalSalesValue.toFixed(2)}</p>
                        </div>
                        <div className="card">
                            <h3>Total Sold Quantity</h3>
                            <p>{totalSoldQuantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;