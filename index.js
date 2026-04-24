var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");

app.use(cors());
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index.pug", { name: "Jai...Balayya" });
});

app.get("/issues", (req, res) => {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/issues.txt").toString());
  res.send(JSON.stringify(fd));
});

app.get("/movies", (req, res) => {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/movies.txt").toString());
  res.send(JSON.stringify(fd));
});

// app.get("/issues", (req, res) => {
//   var fd = JSON.parse(fs.readFileSync(__dirname + "/issues.txt").toString());

//   res.render("issues", { issues: [...fd] });
// });

// app.get("/movies", (req, res) => {
//   var fd = JSON.parse(fs.readFileSync(__dirname + "/movies.txt").toString());

//   res.render("movies", { movies: [...fd] });
// });

app.listen(3500, () => {
  console.log("Server uriking on 3500");
});
