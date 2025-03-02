const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Helper function to verify JWT token from request headers
 */
const verifyToken = (req) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Unauthorized");
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
    },
});

const UserController = {
    // Signup: Create a new admin
    async usersignup(req, res) {
        try {
            const { name, contact, email, password } = req.body;

            // Validate input fields
            if (!name || !contact || !email || !password) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ msg: "Admin already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.createUser(name, contact, email, hashedPassword);

            res.status(201).json({ msg: "Admin created successfully", user: newUser });
        } catch (error) {
            console.error("Signup Error:", error.message);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // Login: Authenticate admin and generate JWT token
    async userlogin(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({ msg: "Email and password are required" });
            }

            // Find user by email
            const user = await UserModel.findUserByEmail(email);
            if (!user) return res.status(400).json({ msg: "Admin not found" });

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            // Exclude password from response
            const { password: _, ...userWithoutPassword } = user;

            res.json({ token, user: userWithoutPassword });
        } catch (error) {
            console.error("Login Error:", error.message);
            res.status(500).json({ msg: "Server Error" });
        }
    },


    // Get all users
    async getAllUsers (req, res) {
    try {
        const users = await UserModel.getAllUsers(); // You can call the database method here
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
},

    // Get user details using JWT token
    async getUserDetails(req, res) {
        try {
            const decoded = verifyToken(req);
            const user = await UserModel.findUserById(decoded.userId);

            if (!user) return res.status(404).json({ msg: "User not found" });

            res.json(user);
        } catch (error) {
            console.error("Get User Details Error:", error.message);
            res.status(401).json({ msg: "Invalid token" });
        }
    },

    // Get user details by ID
    async getUserDetailsByID(req, res) {
        try {
            const decoded = verifyToken(req);
            const user = await UserModel.findUserById(decoded.userId);

            if (!user) return res.status(404).json({ msg: "User not found" });

            // Return user details excluding password
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                contact: user.contact,
            });
        } catch (error) {
            console.error("Get User By ID Error:", error.message);
            res.status(401).json({ msg: "Invalid token" });
        }
    },

    // Update user details
    async updateUserDetails(req, res) {
        try {
            const { name, contact, email } = req.body;

            // Validate input
            if (!name || !contact || !email) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            const decoded = verifyToken(req);
            const userId = decoded.userId;

            const updatedUser = await UserModel.updateUser(userId, name, contact, email);
            if (!updatedUser) return res.status(404).json({ msg: "User not found" });

            res.json({
                msg: "Profile updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Update User Error:", error.message);
            res.status(500).json({ msg: "Error updating user data" });
        }
    },

    async changeUserPassword(req, res) {
        try {
            const { currentpassword, newpassword } = req.body;
            const token = req.header("Authorization");
    
            if (!token) return res.status(401).json({ msg: "Unauthorized" });
    
            // Verify JWT token
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            const userId = decoded.userId;
    
            // Get user details
            const user = await UserModel.findUserId(userId);
            if (!user) return res.status(404).json({ msg: "User not found" });
    
            // Check if current password matches
            const isMatch = await bcrypt.compare(currentpassword, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });
    
            // Hash new password
            const hashedPassword = await bcrypt.hash(newpassword, 10);
    
            // Update password in DB
            await UserModel.updateUserPassword(userId, hashedPassword);
    
            res.json({ msg: "Password updated successfully!" });
        } catch (error) {
            console.error("Error updating password:", error);
            res.status(500).json({ msg: "Server error" });
        }
    },

    // 1️⃣ Send OTP
    async sendOtp(req, res) {
        try {
            const { email } = req.body;

            // Check if user exists
            const user = await UserModel.findUserByEmail(email);
            if (!user) return res.status(404).json({ msg: "Your email didnot  found" });

            // Generate OTP & Expiration
            const otp = UserModel.generateResetCode();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

            // Store OTP in DB
            await UserModel.storeResetCode(email, otp, expiresAt);

            // Send email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) return res.status(500).json({ msg: "Error sending email" });
                res.json({ msg: "OTP sent successfully" });
            });
        } catch (error) {
            console.error("Send OTP Error:", error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // 2️⃣ Verify OTP
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;

            // Check if OTP is valid
            const user = await UserModel.findUserByResetCode(email, otp);
            if (!user) return res.status(400).json({ msg: "Invalid or expired OTP" });

            res.json({ msg: "OTP verified successfully" });
        } catch (error) {
            console.error("Verify OTP Error:", error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // 3️⃣ Reset Password
    async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;

            // Validate OTP
            const user = await UserModel.findUserByResetCode(email, otp);
            if (!user) return res.status(400).json({ msg: "Invalid or expired OTP" });

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password in DB
            await UserModel.resetUserPassword(user.id, hashedPassword);

            res.json({ msg: "Password reset successful" });
        } catch (error) {
            console.error("Reset Password Error:", error);
            res.status(500).json({ msg: "Server Error" });
        }
    },
    
};

module.exports = UserController;
 