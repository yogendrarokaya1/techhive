const express = require("express");
const AdminController = require("../controller/adminController");

const router = express.Router();

// POST /api/admin/signup - Admin signup
router.post("/signup", AdminController.signup);

// POST /api/admin/login - Admin login
router.post("/login", AdminController.login);

module.exports = router;
