const express = require("express");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes); // Admin Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
