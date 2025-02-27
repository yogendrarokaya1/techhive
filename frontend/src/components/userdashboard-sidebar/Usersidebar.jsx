import { useNavigate, useLocation } from "react-router-dom";
import "./usersidebar.css"; // Ensure you have the CSS for styling

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  return (
    <aside className="usersidebar">
      <ul>
        <li
          onClick={() => navigate("/userdashboard-accountinfo")}
          className={location.pathname === "/userdashboard-accountinfo" ? "active" : ""}
        >
          Account Dashboard
        </li>
        <li
          onClick={() => navigate("/order")}
          className={location.pathname === "/order" ? "active" : ""}
        >
          My Orders
        </li>
        <li
          onClick={() => navigate("/cartlist")}
          className={location.pathname === "/cartlist" ? "active" : ""}
        >
          My Cart
        </li>
        <li
          onClick={() => navigate("/edituser-info")}
          className={location.pathname === "/edituser-info" ? "active" : ""}
        >
          Edit Information
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
