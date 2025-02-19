// src/pages/AdminDashboard.js
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./adminnavbar/Adminnavbar";
import AdminSidebar from "./adminsidebar/Adminsidebar"; // Import Sidebar

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login page if there's no token in localStorage
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        }
    }, [navigate]);

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <AdminSidebar />

            <div style={{ marginLeft: "250px", width: "100%" }}>
                <AdminNavbar />
                <div style={{ padding: "20px" }}>
                    <h2>Welcome to the Admin Dashboard</h2>
                    <p>Manage your site and users from here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
