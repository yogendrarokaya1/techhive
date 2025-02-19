import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/userdashboard-sidebar/Usersidebar";
import DashboardContent from "../../components/userdashboard-sidebar/AccountInformation";
import "./userdashboard.css"


const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/userlogin"); // Redirect to login page if no token
    }
  }, [navigate]);

  return (
    <div>
      <div className="user-dashboard" >
      <UserSidebar />
      <DashboardContent />
    </div>
    </div>
  );
};

export default UserDashboard;
