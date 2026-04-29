var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  vendor: String,
  stock: Number,
  image: String,
});
var Product = mongoose.model("Product", productSchema);
module.exports = Product;
