// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "yourSecretKey123456is3344good"); // Replace with your secret key
    req.userId = decoded.userId; // Attach userId to the request object
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

module.exports = authMiddleware;