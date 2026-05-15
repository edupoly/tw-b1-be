var express = require("express");
var http = require("http");
var { Server } = require("socket.io");

var app = express();
var server = http.createServer(app);

var io = new Server(server);
var liveUserCount = 0;
io.on("connection", (socket) => {
  socket.username = socket.handshake.query.username;
  liveUserCount++;
  io.emit("liveCountEvent", { uc: liveUserCount });

  socket.on("disconnect", () => {
    liveUserCount--;
    io.emit("liveCountEvent", { uc: liveUserCount, greeting: "Bagunnara sir" });
  });
  socket.on("userMessage", (ms) => {
    console.log(socket.username + " :: " + ms.msg);

    io.emit("groupMessage", { ms, username: socket.username });
  });
});

app.use(express.static(__dirname + "/general"));

server.listen(process.env.PORT || 3500, () => {
  console.log("Server uriking on 3500");
});
