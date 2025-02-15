const pool = require("../database/db");

class ProductModel {
    static async addProduct(data) {
        const {
            name, modelseries, description, category, brand, price, stock, 
            processor, ram, storage, screenSize, os, images
        } = data;

        const query = `
            INSERT INTO products 
            (name, modelseries, description, category, brand, price, stock, processor, ram, storage, screenSize, os, images) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
            RETURNING *`;
        
        const values = [
            name, modelseries, description, category, brand, price, stock,
            processor, ram, storage, screenSize, os, images
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

}

module.exports = ProductModel;
