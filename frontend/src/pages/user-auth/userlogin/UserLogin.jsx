import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../userauth.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request

    try {
      const response = await fetch("http://localhost:5000/api/user/userslogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // If login is successful, save user data and token
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({ name: data.user.name }));
        localStorage.setItem("userToken", data.token);

        // Trigger a custom event to update the Navbar (if necessary)
        window.dispatchEvent(new Event("storage"));

        // Redirect to the user dashboard after successful login
        navigate("/userdashboard-accountinfo");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      // Handle server error
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="main-user-container">
      <div className="userlogin-container">
        <h2 className="user-title">Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="userlogin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="userlogin-button">Login</button>
        </form>
        <div className="userauth-links">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/usersignup")} className="userlogin-link">
              Sign Up Here
            </span>
          </p>
        </div>
        <div>
          <button onClick={() => navigate("/forget-password")}>
            Forget Password?
          </button>        
          </div>
      </div>
    </div>
  );
};

export default UserLogin;
