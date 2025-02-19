import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../userauth.css";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/userssignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("User registered successfully!");
        setTimeout(() => navigate("/userlogin"), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Server error");
    }
  };

  return (
    <div className="main-user-container">
      <div className="usersignup-container">
        <h2 className="user-title">Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="usersignup-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <button type="submit" className="usersignup-button">Register</button>
        </form>
        <div className="userauth-links">
          <p>
            Already registered?{" "}
            <span onClick={() => navigate("/userlogin")} className="usersignup-link">
              Login Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
