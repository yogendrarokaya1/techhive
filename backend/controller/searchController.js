const SearchModel = require("../model/searchModel");

const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const results = await SearchModel.searchProducts(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { searchProducts };
