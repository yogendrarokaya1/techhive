const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Place an order (requires authentication)
router.post("/place", authMiddleware, OrderController.placeOrder);
router.delete('/delete/:orderId', OrderController.deleteOrder);

// Get user orders (requires authentication)
router.get("/", authMiddleware, OrderController.getOrders);

router.get("/allorder",OrderController.getAllOrders);
router.put("/accept/:orderId", OrderController.acceptOrder);



module.exports = router;
