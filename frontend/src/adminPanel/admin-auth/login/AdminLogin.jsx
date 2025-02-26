import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminAuth.css"; // Import CSS file

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            navigate("/admin/dashboard"); // Redirect to dashboard if logged in
        }
    }, [navigate]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch("http://localhost:5000/api/admin/adminlogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        console.log("API Response:", data); // ✅ Debug API Response
    
        if (response.ok) {
            localStorage.setItem("adminToken", data.token);  // ✅ Store Token
            localStorage.setItem("adminName", data.admin?.name || ""); // ✅ Store Admin Name
    
            alert("Login Successful");
            navigate("/admin/dashboard"); // Redirect to dashboard
        } else {
            alert(data.msg);
        }
    };
    

    // Navigate to forgot password page
    const handleForgotPassword = () => {
        navigate("/admin/forgot-password");
    };

    // Navigate to signup page
    const handleSignupRedirect = () => {
        navigate("/admin/adminsignup");
    };

    return (
        <div className="admin-auth-container">
            <h2>Welcome back, Admin!</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <button className="login-btn" type="submit">Login</button>
            </form>

            <div className="auth-links">
                <button onClick={handleForgotPassword}>Forgot Password?</button>
                <p>
                    Don't have an account?{" "}
                    <span onClick={handleSignupRedirect} className="signup-link">
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
