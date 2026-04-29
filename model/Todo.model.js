var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
  title: String,
  status: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  creator: String,
});

var TodoModel = new mongoose.model("Todo", todoSchema);
module.exports = TodoModel;
