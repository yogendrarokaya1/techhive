const pool = require("../database/db");

const AdminModel = {
    // Create new admin
    async createAdmin(name, username, email, hashedPassword) {
        const query = `INSERT INTO admins (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [name, username, email, hashedPassword];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Find an admin by email
    async findAdminByEmail(email) {
        const query = `SELECT * FROM admins WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
};

module.exports = AdminModel;
