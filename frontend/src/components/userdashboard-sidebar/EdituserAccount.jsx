import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/userdashboard-sidebar/Usersidebar";
import axios from "axios";
import "./usersidebar.css";

const EditUserAccount = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/userlogin"); 
    } else {
      axios
        .get("http://localhost:5000/api/user/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/userlogin");  // Redirect to login on error
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    axios
      .put(
        "http://localhost:5000/api/user/update",
        { ...userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-account-container">
      <UserSidebar />
      <div className="user-edit-form">
        <h2>Edit User Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={userData.contact}
            onChange={handleChange}
          />

          <button type="submit" onClick={() => navigate("/userdashboard-accountinfo")}>Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserAccount;
