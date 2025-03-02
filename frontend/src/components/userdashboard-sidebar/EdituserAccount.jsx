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

  const [passwordData, setPasswordData] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpass: "",
  });

  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
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
          navigate("/userlogin"); // Redirect to login if error occurs
        });
    }
  }, [navigate]);

  // Handle input changes for user details
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle input changes for password
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Submit updated user details
  const handleUserDataSubmit = (e) => {
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

  // Submit password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setPasswordError("");
    setPasswordSuccess("");

    // Validation checks
    if (!passwordData.currentpassword || !passwordData.newpassword || !passwordData.confirmpass) {
      setPasswordError("All fields are required.");
      return;
    }

    if (passwordData.newpassword !== passwordData.confirmpass) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (passwordData.newpassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/changepassword",
        {
          currentpassword: passwordData.currentpassword,
          newpassword: passwordData.newpassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPasswordSuccess(response.data.msg);
      setPasswordData({ currentpassword: "", newpassword: "", confirmpass: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError(error.response?.data?.msg || "Failed to update password. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-account-container">
      <UserSidebar />
      <div className="user-edit-form">
        <h2>Edit User Account</h2>
        <form onSubmit={handleUserDataSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} />

          <label>Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleUserDataChange} />

          <label>Contact</label>
          <input type="text" name="contact" value={userData.contact} onChange={handleUserDataChange} />

          <button type="submit">Update Profile</button>
        </form>

        <div className="user-changepass-container">
          <h2>Change Password</h2>

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          {passwordSuccess && <p style={{ color: "green" }}>{passwordSuccess}</p>}

          <form onSubmit={handlePasswordSubmit}>
            <label>Current Password</label>
            <input type="password" name="currentpassword" value={passwordData.currentpassword} onChange={handlePasswordChange} />

            <label>New Password</label>
            <input type="password" name="newpassword" value={passwordData.newpassword} onChange={handlePasswordChange} />

            <label>Confirm Password</label>
            <input type="password" name="confirmpass" value={passwordData.confirmpass} onChange={handlePasswordChange} />

            <button type="submit">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserAccount;
