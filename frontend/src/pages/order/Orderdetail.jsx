import { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../components/userdashboard-sidebar/Usersidebar";
import "./orderdetail.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("You must be logged in to view your orders.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          alert("No orders found.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);



  return (
    <div className="orderdetail-container">
      <UserSidebar />

      <div className="orderdetail-content">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>Rs {order.product_price}</td>
                    <td>Rs {order.total_price}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>

           
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
