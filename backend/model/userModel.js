const pool = require("../database/db");

const UserModel = {
    // Create new admin
    async createUser(name, contact, email, hashedPassword) {
        const query = `INSERT INTO users (name, contact, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [name, contact, email, hashedPassword];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Find an admin by email
    async findUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
};

module.exports = UserModel;
