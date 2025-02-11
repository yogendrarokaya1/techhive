import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login page if there's no token in localStorage
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/");
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove token from localStorage and redirect to login
        localStorage.removeItem("adminToken");
        navigate("/admin/");
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            {/* Add your dashboard content */}
        </div>
    );
};

export default AdminDashboard;
