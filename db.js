var mongoose = require("mongoose");
const dbConnet = async () => {
  var conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
};
module.exports = dbConnet;
