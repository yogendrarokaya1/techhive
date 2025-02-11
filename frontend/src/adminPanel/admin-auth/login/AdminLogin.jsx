import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminAuth.css";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Redirect logged-in users to the dashboard
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
        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("adminToken", data.token);
            alert("Login Successful");
            navigate("/admin/dashboard");
        } else {
            alert(data.msg);
        }
    };

    const handleForgotPassword = () => {
        navigate("/admin/forgot-password"); // Redirect to the forgot password page
    };

    const handleSignupRedirect = () => {
        navigate("/admin/signup"); // Redirect to the signup page for admins
    };

    return (
        <div className="admin-auth-container">
            <h2>Welcome back, Admin!</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    value={formData.email || ""}  // Ensure it's always a controlled input
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    value={formData.password || ""}  // Ensure it's always a controlled input
                    required 
                />
                <button type="submit">Login</button>
            </form>

            <div className="auth-links">
                <button onClick={handleForgotPassword}>Forgot Password?</button>
                <p>Don't have an account? <span onClick={handleSignupRedirect} className="signup-link">Sign Up</span></p>
            </div>
        </div>
    );
};

export default AdminLogin;
