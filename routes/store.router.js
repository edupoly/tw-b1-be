var express = require("express");
var router = express.Router();
var Store = require("../model/Store.model");

router.get("/", (req, res) => {
  Store.find().then((data) => {
    res.send(data);
  });
});

module.exports = router;
