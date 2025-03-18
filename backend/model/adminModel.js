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
    },

    getTotalUsers: async () => {
    try {
      const result = await pool.query("SELECT COUNT(*) FROM users");
      return result.rows[0].count;
    } catch (error) {
      throw new Error("Error fetching total users: " + error.message);
    }
  },

  // Get total number of products
  getTotalProducts: async () => {
    try {
      const result = await pool.query("SELECT COUNT(*) FROM products");
      return result.rows[0].count;
    } catch (error) {
      throw new Error("Error fetching total products: " + error.message);
    }
  },

  getTotalSoldQuantity: async () => {
    try {
      const result = await pool.query("SELECT SUM(quantity) FROM orders");
      return result.rows[0].sum || 0; // Return 0 if no orders exist
    } catch (error) {
      throw new Error("Error fetching total sold quantity: " + error.message);
    }
  },

  getTotalSales: async () => {
    try {
      const result = await pool.query("SELECT SUM(total_price) FROM orders");
      return parseFloat(result.rows[0].sum) || 0; // Ensure it's a number
    } catch (error) {
      throw new Error("Error fetching total sales: " + error.message);
    }
  },
};

module.exports = AdminModel;
