const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());


// Admin Routes
app.use("/api/admin", adminRoutes);

// Product Routes - ensure this is correct
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
