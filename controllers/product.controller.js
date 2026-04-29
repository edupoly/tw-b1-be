var Product = require("../model/Product.model");

var getAllProducts = (req, res) => {
  Product.find().then((data) => {
    res.send(data);
  });
};

var addNewProduct = (req, res) => {
  console.log(req.body);
  var newProduct = new Product(req.body);
  newProduct.save().then(() => {
    res.send("Ipoindi");
  });
};
module.exports = {
  getAllProducts,
  addNewProduct,
};
