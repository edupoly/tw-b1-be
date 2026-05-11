var express = require("express");
var http = require("http");
var { Server } = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = new Server(server);

app.listen(3500, () => {
  console.log("Server uriking on 3500");
});
