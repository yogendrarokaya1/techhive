const pool = require("../database/db");
const crypto = require("crypto");


const UserModel = {

    // Generate a secure random reset code (6-digit OTP)
    generateResetCode() {
        return crypto.randomInt(100000, 999999); // 6-digit OTP
    },
    // Create new user
    async createUser(name, contact, email, hashedPassword) {
        const query = `INSERT INTO users (name, contact, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [name, contact, email, hashedPassword];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Find an user by email
    async findUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    async findUserById(userId) {
        const query = `SELECT id, name, email, contact FROM users WHERE id = $1`;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    },

    // Get all users
async getAllUsers() {
    const query = `SELECT id, name, contact, email FROM users`;
    const result = await pool.query(query);
    return result.rows;
},
    
    
    async updateUser(userId, name, contact, email) {
        const query = `UPDATE users SET name = $1, contact = $2, email = $3 WHERE id = $4 RETURNING *`;
        const values = [name, contact, email, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // For changing password

    async findUserId(userId) {
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    },

    async updateUserPassword(userId, hashedPassword) {
        const query = `UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email`;
        const values = [hashedPassword, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // reset password
    async storeResetCode(email, resetCode, expiresAt) {
        const query = `UPDATE users SET reset_code = $1, reset_code_expires = $2 WHERE email = $3 RETURNING *`;
        const values = [resetCode, expiresAt, email];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async findUserByResetCode(email, resetCode) {
        const query = `SELECT * FROM users WHERE email = $1 AND reset_code = $2 AND reset_code_expires > NOW()`;
        const result = await pool.query(query, [email, resetCode]);
        return result.rows[0];
    },

    async resetUserPassword(userId, hashedPassword) {
        const query = `UPDATE users SET password = $1, reset_code = NULL, reset_code_expires = NULL WHERE id = $2 RETURNING id, email`;
        const values = [hashedPassword, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    
};

module.exports = UserModel;
