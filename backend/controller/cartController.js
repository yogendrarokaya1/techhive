const Cartlist = require("../model/cartModel");

const addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
  
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }
  
    try {
      const result = await Cartlist.addToCart(userId, productId);
  
      if (!result.success) {
        return res.status(400).json({ success: false, message: result.message });
      }
  
      res.status(201).json({ success: true, data: result.data });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ success: false, message: "Failed to add product to wishlist." });
    }
  };


  const getCart = async (req, res) => {
    const userId = req.userId;
  
    try {
      const wishlist = await Cartlist.getCartByUser(userId);
      res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ success: false, message: "Failed to fetch wishlist." });
    }
  };

  const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
  
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }
  
    try {
      const deletedItem = await Cartlist.removeFromCart(userId, productId);
      if (deletedItem) {
        res.status(200).json({ success: true, message: "Product removed from wishlist." });
      } else {
        res.status(404).json({ success: false, message: "Product not found in wishlist." });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ success: false, message: "Failed to remove product from wishlist." });
    }
  };

module.exports = { addToCart, getCart,  removeFromCart};