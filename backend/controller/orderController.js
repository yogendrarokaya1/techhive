const OrderModel = require("../model/orderModel");

const OrderController = {
    placeOrder: async (req, res) => {
        try {
          const userId = req.userId; // From auth middleware
          const { productId, quantity, totalPrice } = req.body;
      
          // Validate required fields
          if (!productId || !quantity || !totalPrice) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
          }
      
          const newOrder = await OrderModel.placeOrder(userId, productId, quantity, totalPrice);
      
          res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: newOrder
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

   // Accept an order
   acceptOrder: async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const updatedOrder = await OrderModel.acceptOrderById(orderId);
      res.status(200).json({
        success: true,
        message: "Order accepted successfully",
        order: updatedOrder // Send back the updated order with status
      });
    } catch (error) {
      console.error("Error accepting order:", error);
      res.status(500).json({ success: false, message: "Failed to accept order" });
    }
  },
};
      


module.exports = OrderController;
