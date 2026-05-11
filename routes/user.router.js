var express = require("express");
var router = express.Router();
var UserModel = require("../model/User.model");

router.post("/uploadPic", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // var newUser = new UserModel({ ...req.body, profilePic: req.file.filename });
  // newUser.save();
  // res.send("File uploaded to the location " + req.file.path);
  res.send("File uploaded to the location ");
});
router.get("/allusers", (req, res) => {
  UserModel.find().then((data) => {
    res.send(data);
  });
});
module.exports = router;
