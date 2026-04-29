require("dotenv").config();
var express = require("express");
var app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var dbConnect = require("./db");

var multer = require("multer");
// var upload = multer({ dest: "./uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("req.file::", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

var productsRotuer = require("./routes/product.router");
var storeRouter = require("./routes/store.router");
var todoRouter = require("./routes/todo.router");
var userRouter = require("./routes/user.router");

app.use(express.static(__dirname + "/general"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(upload.single("profilePic"));

dbConnect();

app.use("/products", productsRotuer);
app.use("/stores", storeRouter);
app.use("/todos", todoRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello ALL");
});

app.listen(process.env.PORT, () => {
  console.log("Server uriking on " + process.env.PORT);
});
