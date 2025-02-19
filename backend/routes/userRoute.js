const express = require("express");
const AdminController = require("../controller/userController");

const router = express.Router();

// POST /api/admin/signup - Admin signup
router.post("/userssignup", AdminController.usersignup);

// POST /api/admin/login - Admin login
router.post("/userslogin", AdminController.userlogin);

module.exports = router;
