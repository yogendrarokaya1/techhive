const express = require("express");
const {
  getAllUsers,
  saveAllUsers,
} = require("../controller/userController");
 
const router = express.Router();
 
router.get("/users", getAllUsers);
router.post("/users", saveAllUsers);
 
module.exports = { router };
 