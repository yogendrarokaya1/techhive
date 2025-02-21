const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
require("dotenv").config();

const UserController = {
    // Signup: Create a new admin
    async usersignup(req, res) {
        try {
            const { name, contact, email, password } = req.body;

            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser) return res.status(400).json({ msg: "Admin already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.createUser(name, contact, email, hashedPassword);

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // Login: Authenticate admin and generate JWT token
    async userlogin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findUserByEmail(email);
            if (!user) return res.status(400).json({ msg: "Admin not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ token, user });
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    },
    async getUserDetails(req, res) {
        try {
            const token = req.header("Authorization");
            if (!token) return res.status(401).json({ msg: "Unauthorized" });

            // Verify token
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            const userId = decoded.userId;

            const user = await UserModel.findUserById(userId);
            if (!user) return res.status(404).json({ msg: "User not found" });

            res.json(user);
        } catch (error) {
            res.status(401).json({ msg: "Invalid token" });
        }
    },

    async getUserDetailsByID(req, res) {
        try {
            const token = req.header("Authorization");
            if (!token) return res.status(401).json({ msg: "Unauthorized" });

            // Verify token
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            const userId = decoded.userId;

            // Fetch user details
            const user = await UserModel.findUserById(userId);
            if (!user) return res.status(404).json({ msg: "User not found" });

            // Return user details (excluding password)
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                contact: user.contact,
            });
        } catch (error) {
            console.error(error);
            res.status(401).json({ msg: "Invalid token" });
        }
    },

    // Update User Details: Update user details using the JWT token
    async updateUserDetails(req, res) {
        try {
            const { name, contact, email } = req.body;
            const token = req.header("Authorization");
            if (!token) return res.status(401).json({ msg: "Unauthorized" });

            // Verify token
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            const userId = decoded.userId;

            // Update user details
            const updatedUser = await UserModel.updateUser(userId, name, contact, email);
            if (!updatedUser) return res.status(404).json({ msg: "User not found" });

            res.json({
                msg: "Profile updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error updating user data" });
        }
    }

};

module.exports = UserController;
