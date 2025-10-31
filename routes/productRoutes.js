const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.post("/add", addProduct);

module.exports = router;
