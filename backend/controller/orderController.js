const OrderModel = require("../model/orderModel");
const pool = require("../database/db");
require("dotenv").config();

const nodemailer = require("nodemailer");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
},
});

const OrderController = {
  placeOrder: async (req, res) => {
    try {
      const userId = req.userId; // From auth middleware
      const { productId, quantity, totalPrice, district, city, tole, paymentmethod } = req.body;
  
      // Validate required fields
      if (!productId || !quantity || !totalPrice || !district || !city || !tole || !paymentmethod) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      const newOrder = await OrderModel.placeOrder(
        userId,
        productId,
        quantity,
        totalPrice,
        district,
        city,
        tole,
        paymentmethod
      );

      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [quantity, productId]
      );
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully!",
        order: newOrder,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
      

      getOrders: async (req, res) => {
        const userId = req.userId;  // Ensure this comes from the authMiddleware
        
        if (!userId) {
          return res.status(400).json({ success: false, message: "User not authenticated" });
        }
      
        try {
          const orders = await OrderModel.getOrdersByUserId(userId);  // Fetch orders by userId
          if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
          }
          res.status(200).json({ success: true, orders });
        } catch (error) {
          console.error("Error fetching orders:", error);
          res.status(500).json({ success: false, message: "Error fetching orders" });
        }
      },

       // Method to delete an order
  deleteOrder: async (req, res) => {
    const { orderId } = req.params; // Extract orderId from URL parameters

    try {
      const result = await OrderModel.deleteOrderById(orderId);
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ success: false, message: 'Failed to delete order' });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.getAllOrders();

      if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found" });
      }

      res.status(200).json({ success: true, orders: orders });
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  //  // Accept an order
  //  acceptOrder: async (req, res) => {
  //   const { orderId } = req.params;
  
  //   try {
  //     const updatedOrder = await OrderModel.acceptOrderById(orderId);
  //     res.status(200).json({
  //       success: true,
  //       message: "Order accepted successfully",
  //       order: updatedOrder // Send back the updated order with status
  //     });
  //   } catch (error) {
  //     console.error("Error accepting order:", error);
  //     res.status(500).json({ success: false, message: "Failed to accept order" });
  //   }
  // },

  acceptOrder: async (req, res) => {
    const { orderId } = req.params;

    try {
        // Update the order status to "Accepted"
        const updatedOrder = await OrderModel.acceptOrderById(orderId);

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Fetch user and order details including the product name
        const orderDetails = await pool.query(
            `SELECT users.name, users.email, products.name as product_name, orders.quantity, orders.total_price, orders.order_date
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN products ON orders.product_id = products.id
            WHERE orders.id = $1`,
            [orderId]
        );

        if (orderDetails.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Order details not found" });
        }

        const { name, email, product_name, quantity, total_price, order_date } = orderDetails.rows[0];

        // Format the email body
        const emailBody = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f8f8;">
                <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 8px; margin: auto;">
                    <h2 style="color: #333; text-align: center;">🎉 Your Order Has Been Accepted!</h2>
                    <p>Dear <b>${name}</b>,</p>
                    <p>We are happy to inform you that your order <b>#${orderId}</b> has been successfully accepted and is being processed.</p>
                    <hr>
                    <h3>📝 Order Details:</h3>
                    <p><b>Product:</b> ${product_name}</p>
                    <p><b>Quantity:</b> ${quantity}</p>
                    <p><b>Total Price:</b> Rs ${total_price}</p>
                    <p><b>Order Date:</b> ${new Date(order_date).toLocaleDateString()}</p>
                    <hr>
                    <p>📦 Your order will be shipped soon. You will receive call, email or notification once it is on its way!</p>
                    <p>If you have any questions or need assistance, please feel free to <a href="mailto:support@techhive.com">contact us</a>.</p>
                    <p>Thank you for shopping with <b>Techhive</b>! 😊</p>
                    <p>Best regards,</p>
                    <p><b>Techhive Team</b></p>
                </div>
            </div>
        `;

        // Send email to the user
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,  // User email
            subject: `Your Order #${orderId} Has Been Accepted`,  // Email subject
            html: emailBody,  // HTML formatted email body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Order accepted and email sent successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error accepting order:", error);
        res.status(500).json({ success: false, message: "Failed to accept order" });
    }
},

  
};
      


module.exports = OrderController;
