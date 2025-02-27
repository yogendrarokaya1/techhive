const express = require("express");
const cartController = require("../controller/cartController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// Add to wishlist
router.post("/add", authMiddleware, cartController.addToCart);

// Get wishlist by user
router.get("/", authMiddleware, cartController.getCart);

router.delete("/remove", authMiddleware, cartController.removeFromCart);


module.exports = router;