const ProductModel = require("../model/productModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path);
                return result.secure_url;
            })
        );

        const productData = { ...req.body, images: uploadedImages };
        const product = await ProductModel.addProduct(productData);

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product" });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const imagesToRemove = JSON.parse(req.body.imagesToRemove || "[]");

    try {
        // Fetch current product
        const product = await ProductModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove images from Cloudinary
        for (const img of imagesToRemove) {
            const publicId = img.split("/").pop().split(".")[0]; // Extract Cloudinary public ID
            await cloudinary.uploader.destroy(publicId);
        }

        // Update database: Remove deleted images
        const updatedImages = product.images.filter((img) => !imagesToRemove.includes(img));

        // Save updated product
        await ProductModel.updateProduct(id, { ...req.body, images: updatedImages });

        res.json({ message: "Product updated successfully", images: updatedImages });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await ProductModel.deleteProduct(id);
        if (deletedProduct) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};


exports.getLatestProducts = async (req, res) => {
    try {
        const laptops = await ProductModel.getLatestLaptops();
        const gamingLaptops = await ProductModel.getLatestGamingLaptops();

        res.status(200).json({ laptops, gamingLaptops });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};