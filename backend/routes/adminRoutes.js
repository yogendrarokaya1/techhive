const express = require("express");
const AdminController = require("../controller/adminController");

const router = express.Router();

// POST /api/admin/signup - Admin signup
router.post("/adminsignup", AdminController.signup);

// POST /api/admin/login - Admin login
router.post("/adminlogin", AdminController.login);

router.get("/dashboard-data", AdminController.getDashboardData);


module.exports = router;
