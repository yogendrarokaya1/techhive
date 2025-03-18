const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../model/adminModel");
require("dotenv").config();

const AdminController = {
    // Signup: Create a new admin
    async signup(req, res) {
        try {
            const { name, username, email, password } = req.body;

            const existingAdmin = await AdminModel.findAdminByEmail(email);
            if (existingAdmin) return res.status(400).json({ msg: "Admin already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await AdminModel.createAdmin(name, username, email, hashedPassword);

            res.status(201).json(newAdmin);
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // Login: Authenticate admin and generate JWT token
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const admin = await AdminModel.findAdminByEmail(email);
            if (!admin) return res.status(400).json({ msg: "Admin not found" });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ token, admin });
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    },

    getDashboardData: async (req, res) => {
        try {
          const totalUsers = await AdminModel.getTotalUsers();
          const totalProducts = await AdminModel.getTotalProducts();
          const totalSoldQuantity = await AdminModel.getTotalSoldQuantity();
          const totalSales = await AdminModel.getTotalSales();

          res.status(200).json({
            success: true,
            totalUsers,
            totalProducts,
            totalSoldQuantity,
            totalSales,
          });
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      },
};

module.exports = AdminController;
