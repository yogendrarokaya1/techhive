// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./adminsidebar.css"; // Your styles for the sidebar

const AdminSidebar = () => {
    const location = useLocation(); // Hook to get the current location

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Admin Dashboard</h3>
            <ul className="sidebar-menu">
                <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className={location.pathname === "/admin/listproduct" || location.pathname === "/admin/add-product" || location.pathname === "/admin/edit-product" || location.pathname.includes("/admin/edit-product/") ? "active" : ""}>
                    <Link to="/admin/listproduct">Products Management</Link>
                </li>

                <li className={location.pathname === "/admin/adminorder" ? "active" : ""}>
                    <Link to="/admin/adminorder">Order Management</Link>
                </li>

                <li className={location.pathname === "/admin/usermanage" ? "active" : ""}>
                    <Link to="/admin/usermanage">Users Management</Link>
                </li>
                <li className={location.pathname === "/admin/admin-users" ? "active" : ""}>
                    <Link to="/admin/admin-users">Admin Management</Link>
                </li>
                <li className={location.pathname === "/admin/settings" ? "active" : ""}>
                    <Link to="/admin/settings">Settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
