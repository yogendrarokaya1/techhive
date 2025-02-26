const pool = require("../database/db");

class WishlistModel {

    static async addToWishlist(userId, productId) {
        // Check if the product is already in the wishlist
        const checkQuery = `
          SELECT * FROM wishlist
          WHERE user_id = $1 AND product_id = $2;
        `;
        const checkValues = [userId, productId];
        const checkResult = await pool.query(checkQuery, checkValues);
    
        if (checkResult.rows.length > 0) {
          return { success: false, message: "Product is already in your wishlist." };
        }
    
        // Add the product to the wishlist
        const insertQuery = `
          INSERT INTO wishlist (user_id, product_id)
          VALUES ($1, $2)
          RETURNING *;
        `;
        const insertValues = [userId, productId];
        const insertResult = await pool.query(insertQuery, insertValues);
        return { success: true, data: insertResult.rows[0] };
      }

    static async getWishlistByUser(userId) {
        const query = `
      SELECT products.*
      FROM wishlist
      JOIN products ON wishlist.product_id = products.id
      WHERE wishlist.user_id = $1;
    `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    static async removeFromWishlist(userId, productId) {
        const query = `
      DELETE FROM wishlist
      WHERE user_id = $1 AND product_id = $2
      RETURNING *;
    `;
        const values = [userId, productId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = WishlistModel;