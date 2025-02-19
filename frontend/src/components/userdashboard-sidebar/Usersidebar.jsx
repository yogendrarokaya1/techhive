import { useNavigate } from "react-router-dom";
import "./usersidebar.css"; // Create a CSS file for styling

const UserSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="usersidebar">
      <ul>
        <li onClick={() => navigate("/dashboard")} className="active">
          Account Dashboard
        </li>
        <li onClick={() => navigate("/orders")}>My Orders</li>
        <li onClick={() => navigate("/wishlist")}>My Wishlist</li>
        <li onClick={() => navigate("/account-info")}>Account Information</li>

      </ul>
    </aside>
  );
};

export default UserSidebar;
