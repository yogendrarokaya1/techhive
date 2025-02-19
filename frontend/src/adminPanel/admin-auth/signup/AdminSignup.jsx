import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminAuth.css"; // Importing CSS file

const AdminSignup = () => {
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" });
    const navigate = useNavigate();

    // Redirect to dashboard if already logged in
    useEffect(() => {
        if (localStorage.getItem("adminToken")) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/admin/adminsignup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Admin registered successfully");
            navigate("/admin/");
        } else {
            alert(data.msg);
        }
    };

    const navigateToLogin = () => {
        navigate("/admin/"); // Redirect to login page
    };

    return (
        <div className="admin-auth-container">
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button className="signup-btn" type="submit">Signup</button>
            </form>

            <div className="auth-links">
                <p>
                    Are you already registered?{" "}
                    <span onClick={navigateToLogin} className="signup-link">
                        Login Here
                    </span>
                </p>
            </div>
        </div>
    ); 
};

export default AdminSignup;
