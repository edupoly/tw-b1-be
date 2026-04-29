var express = require("express");
const {
  getAllProducts,
  addNewProduct,
} = require("../controllers/product.controller");
var router = express.Router();

router.get("/", getAllProducts);

router.post("/", addNewProduct);

module.exports = router;
