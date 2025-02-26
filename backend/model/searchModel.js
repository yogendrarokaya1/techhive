const pool = require("../database/db");

class SearchModel {
    static async searchProducts(query) {
        try {
            const searchQuery = `
                SELECT * FROM products 
                WHERE LOWER(name) LIKE LOWER($1) 
                OR LOWER(brand) LIKE LOWER($1)
                OR LOWER(category) LIKE LOWER($1)
                OR LOWER(description) LIKE LOWER($1)
            `;

            const { rows } = await pool.query(searchQuery, [`%${query}%`]);
            return rows;
        } catch (error) {
            console.error("Database Error:", error);
            throw error;
        }
    }
}

module.exports = SearchModel;
