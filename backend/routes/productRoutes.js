const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");

const upload = multer({ storage: multer.diskStorage({}) });

router.post("/", upload.array("images", 5), productController.addProduct);


module.exports = router;
