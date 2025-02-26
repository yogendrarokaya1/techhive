import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../adminsidebar/Adminsidebar";
import AdminNavbar from "../../adminnavbar/Adminnavbar";
import "../productlist.css";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
        navigate("/admin/");
    } else {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/allorder");

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Error fetching orders:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
}
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/accept/${orderId}`);
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Accepted" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div className="product-list-container">
      <Sidebar />
      <div className="product-list-content">
        <AdminNavbar />
        <div className="product-list-table">
          <h2>All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user_name}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>Rs {order.total_price}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.status}</td> {/* Display the status */}
                    <td>
                      {order.status === "Pending" && (
                        <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPage;
