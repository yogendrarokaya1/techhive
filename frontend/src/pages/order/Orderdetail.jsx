import { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../components/userdashboard-sidebar/Usersidebar";
import "./orderdetail.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to view your orders.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          alert('No orders found.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId, status) => {
    // Check if the order is accepted. If so, prevent deletion.
    if (status === 'Accepted') {
      alert('You cannot delete an accepted order.');
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('You must be logged in to delete an order.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setOrders(orders.filter(order => order.id !== orderId));
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete the order.');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete the order.');
    }
  };

  // Calculate total price of all orders
  const totalOrderPrice = orders.reduce((acc, order) => acc + parseFloat(order.total_price), 0);

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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>Rs {order.price}</td>
                    <td>Rs {order.total_price}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.status}</td> {/* Display the status */}

                    <td>
                      {/* Disable delete button for accepted orders */}
                      {order.status !== "Accepted" && (
                        <button onClick={() => handleDeleteOrder(order.id, order.status)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Display total order price */}
            <div className="total-price">
              <h3>Total Price: Rs {totalOrderPrice.toFixed(2)}</h3>
            </div>
          </>
        )}
        {/* <button className="proceed-button ">Proceed to Done</button> */}
      </div>
    </div>
  );
};

export default OrderPage;
