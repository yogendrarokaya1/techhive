const express = require("express");
const wishlistController = require("../controller/wishlistController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// Add to wishlist
router.post("/add", authMiddleware, wishlistController.addToWishlist);

// Get wishlist by user
router.get("/", authMiddleware, wishlistController.getWishlist);

router.delete("/remove", authMiddleware, wishlistController.removeFromWishlist);


module.exports = router;