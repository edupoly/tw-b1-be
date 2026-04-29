var mongoose = require("mongoose");

var storeSchema = mongoose.Schema({
  name: String,
  description: String,
  vendor: String,
});
var Store = mongoose.model("Store", storeSchema);
module.exports = Store;
