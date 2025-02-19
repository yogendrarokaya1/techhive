import "./usersidebar.css"; // Create a CSS file for styling

const DashboardContent = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", email: "guest@example.com" };

  return (
    <div className="dashboard-content">
      <h2>MY DASHBOARD</h2>
      <hr />
      <h3>ACCOUNT INFORMATION</h3>
      <div className="user-info">
        <div>
          <h4>Contact Information</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="edit-button">Edit</button>
        </div>
       
      </div>
    </div>
  );
};

export default DashboardContent;
