const express = require("express");
const UserController = require("../controller/userController");


const router = express.Router();

// POST /api/admin/signup - Admin signup
router.post("/userssignup", UserController.usersignup);

// POST /api/admin/login - Admin login
router.post("/userslogin", UserController.userlogin);
router.get("/userdata", UserController.getUserDetails);
// Update user details
router.get("/userinfo", UserController.getUserDetailsByID);

router.put('/update', UserController.updateUserDetails);





module.exports = router;
