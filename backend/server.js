const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoute')
const wishlistRoutes = require("./routes/wishlistRoutes")
const OrderListRoutes = require("./routes/orderRoutes")
const SearchRoutes = require("./routes/searchRoutes")
const bodyParser = require('body-parser');

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse incoming JSON requests


// Admin Routes
app.use("/api/admin", adminRoutes);

// Product Routes - ensure this is correct
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", OrderListRoutes);
app.use("/api/search", SearchRoutes);







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
