const ProductModel = require("../model/productModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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


