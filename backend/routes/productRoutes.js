const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");

const upload = multer({ storage: multer.diskStorage({}) });

router.post("/", upload.array("images", 5), productController.addProduct);
// Route to fetch all products
router.get("/", productController.getProducts);

router.delete("/:id", productController.deleteProduct);

router.get("/:id", productController.getProduct);
router.put("/:id", upload.array("images", 5), productController.updateProduct);

router.get("/category/:category", productController.getProductsByCategory);
router.get("/laptoplist/:category", productController.getLaptopsList);






module.exports = router;
