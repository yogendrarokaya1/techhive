import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./usersidebar.css";

const AccountInformation = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken"); 
        if (!token) {
          console.error("No token found, please log in");
          return;
        }

        const response = await fetch("http://localhost:5000/api/user/userdata", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="dashboard-content">
      <h2>MY DASHBOARD</h2>
      <hr />
      <h3>ACCOUNT INFORMATION</h3>
      <div className="user-info">
        <div>
          <h4>Contact Information</h4>
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contact:</strong> {user.contact}</p>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
          <button className="edit-button" onClick={() => navigate("/edituser-info")}>Edit</button>
         
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
