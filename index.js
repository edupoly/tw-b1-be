var express = require("express");
var app = express();
var fs = require("fs");
var url = require("url");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/general"));
app.use(express.static(__dirname + "/andariki"));

function auth(req, res, next) {
  if (req.cookies.username && req.cookies.password) {
    next();
  } else {
    res.redirect("/login.html");
  }
}
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.cookie("password", req.body.password);
  res.send("inka chuskundam");
});

app.use(auth);

app.post("/addEnquiry", function (req, res) {
  console.log(req.body);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/enquiries.txt").toString());
  fd.push(req.body);
  fs.writeFileSync(__dirname + "/enquiries.txt", JSON.stringify(fd));
  res.send("ipoindi");
});

app.get("/getEnquiries", function (req, res) {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/enquiries.txt").toString());
  var ui = "<table border='2'>";
  fd.forEach((enq) => {
    ui += `<tr>
          <td>${enq.name}</td>
          <td>${enq.phonenumber}</td>
          <td>${enq.course}</td>
        </tr>`;
  });
  ui += "</table>";
  res.send(ui);
});

// app.get("/rangeForm.html", (req, res) => {
//   res.sendFile(__dirname + "/public/rangeForm.html");
// });

app.get("/", function (req, res) {
  console.log("hello request recieved");
  res.send("Emi ra ela unnav");
});

app.get("/abc", function (req, res) {
  res.send("You requested abc! em kavali");
});

app.get("/xyz", function (req, res) {
  res.send("Ok pada");
});

app.get("/products/getProductDetailsById/:id", (req, res) => {
  var id = req.params.id;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  console.log(details);
  var selectedProduct = details.products.find((p) => {
    console.log(p.id);
    console.log(id);
    return p.id == id;
  });
  res.send(selectedProduct);
});

app.get("/products/getRange/:x/:y", (req, res) => {
  var x = +req.params.x;
  var y = +req.params.y;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  var selectedProducts = details.products.filter((pr) => {
    if (pr.id > x && pr.id <= y) {
      return true;
    }
  });
  res.send(selectedProducts);
});

app.post("/products/getProductsByPriceRange", (req, res) => {
  // console.log(req.body);
  // res.send("aagura bai");
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  var x = +req.body.startPrice;
  var y = +req.body.endPrice;
  var selectedProducts = details.products.filter((pr) => {
    if (pr.price > x && pr.price <= y) {
      return true;
    }
  });

  res.send(selectedProducts);
});

app.get("/products/getProductsByPriceRange", (req, res) => {
  console.log(req.query);
  var url1 = new url.URL("http://localhost:3500" + req.url);
  // res.send("agura price range kavali");
  var x = +url1.searchParams.get("startPrice");
  var y = +url1.searchParams.get("endPrice");
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());

  var selectedProducts = details.products.filter((pr) => {
    if (pr.price > x && pr.price <= y) {
      return true;
    }
  });
  res.send(selectedProducts);
});

app.get("/add/:x/:y", function (req, res) {
  res.send(+req.params.x + +req.params.y);
});

app.get("/sub/:x/:z", (req, res) => {
  console.log(req.cookies);
  res.send(req.params.x - req.params.z);
});

app.get("/products", (req, res) => {
  var data = fs.readFileSync("products.txt");
  var k = JSON.parse(data.toString());
  res.send(k);
});

app.listen(3500, () => {
  console.log("Server uriking on 3500");
});
