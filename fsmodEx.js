var fs = require("fs");
var data = fs.readFileSync("products.txt");
var k = JSON.parse(data.toString());
console.log(k.products[0].title);
console.log(k.products[0].price);
