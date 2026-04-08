var express = require("express");
var app = express();
var fs = require("fs");
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

app.get("/products/:id",(req,res)=>{
  var id = req.params.id;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  console.log(details)
  var selectedProduct = details.products.find(p=>{
    console.log(p.id)
    console.log(id)
    return p.id==id
  })
  res.send(selectedProduct);
})
app.get("/products/getRange/:x/:y",(req,res)=>{
  var x = +req.params.x;
  var y = +req.params.y;
  var data = fs.readFileSync("products.txt");
  var details = JSON.parse(data.toString());
  console.log(details)
  var selectedProducts = details.products.filter((pr)=>{
    if(pr.id>x && pr.id<=y){
      return true
    }
  })
  res.send(selectedProducts);
})

app.get("/add/:x/:y", function (req, res) {
  console.log(req.params);
  res.send(+req.params.x + +req.params.y);
});

app.get("/sub/:x/:z", (req, res) => {
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
