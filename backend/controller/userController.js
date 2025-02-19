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
    }
};

module.exports = UserController;
