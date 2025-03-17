const express = require("express");
const UserController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// POST /api/admin/signup - Admin signup
router.post("/userssignup", UserController.usersignup);

// POST /api/admin/login - Admin login
router.post("/userslogin", UserController.userlogin);

router.get('/allusers', UserController.getAllUsers); // Route to get all users

router.get("/userdata",authMiddleware, UserController.getUserDetails);
// Update user details
router.get("/userinfo",authMiddleware, UserController.getUserDetailsByID);

router.put('/update',authMiddleware, UserController.updateUserDetails);

router.put("/changepassword", authMiddleware, UserController.changeUserPassword);

router.post("/forgotpassword", UserController.sendOtp);
router.post("/verifyotp", UserController.verifyOtp);
router.post("/resetpassword", UserController.resetPassword);


module.exports = router;
