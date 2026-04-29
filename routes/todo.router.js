var express = require("express");
var router = express.Router();
var TodoModel = require("../model/Todo.model");

router.get("/", (req, res) => {
  TodoModel.find().then((data) => {
    res.send(data);
  });
});

router.post("/", (req, res) => {
  var newTodo = new TodoModel(req.body);
  newTodo.save();
  res.send("Add chestha undu");
});

module.exports = router;
