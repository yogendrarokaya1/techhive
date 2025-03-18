const pool = require("../database/db");

const Order = {
  placeOrder: async (userId, productId, quantity, totalPrice, district, city, tole, paymentmethod) => {
    try {
      const result = await pool.query(
        `INSERT INTO orders 
          (user_id, product_id, quantity, total_price, district, city, tole, paymentmethod) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *`,
        [userId, productId, quantity, totalPrice, district, city, tole, paymentmethod]
      );
      return result.rows[0]; // Return the newly placed order
    } catch (error) {
      throw new Error("Error placing order: " + error.message);
    }
  },

  
  getOrdersByUserId: async (userId) => {
    try {
      const result = await pool.query(
        `SELECT orders.id, orders.quantity, orders.total_price, orders.order_date, orders.status,
                products.name AS product_name,
                products.price AS product_price
         FROM orders
         JOIN products ON orders.product_id = products.id
         WHERE orders.user_id = $1`, 
        [userId]
      );
      return result.rows;  // Return orders with product name and order date for the given userId
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
},

deleteOrderById: async (orderId) => {
    try {
      const result = await pool.query(
        "DELETE FROM orders WHERE id = $1 RETURNING *",
        [orderId]
      );
      return result;
    } catch (error) {
      throw new Error("Error deleting order: " + error.message);
    }
  },

// Get all orders for admin
getAllOrders: async () => {
  try {
    const result = await pool.query(
      `SELECT orders.id, orders.quantity, orders.total_price, orders.order_date, orders.status, orders.paymentmethod, orders.district, orders.city, orders.tole, 
              users.name AS user_name, 
              users.email As user_email,
              users.contact As user_contact,
              products.name AS product_name
       FROM orders
       JOIN users ON orders.user_id = users.id
       JOIN products ON orders.product_id = products.id`
    );

    if (result && result.rows) {
      return result.rows; // Return the rows array
    } else {
      throw new Error('No orders found');
    }
  } catch (error) {
    throw new Error("Error fetching all orders: " + error.message);
  }
},

acceptOrderById: async (orderId) => {
  try {
    const result = await pool.query(
      "UPDATE orders SET status = 'Accepted' WHERE id = $1 RETURNING *",
      [orderId]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Order not found');
    }
    return result.rows[0];  // Returning the updated order
  } catch (error) {
    throw new Error('Error accepting order: ' + error.message);
  }
},

};

module.exports = Order;
