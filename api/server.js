const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ jarvis: "your are in sir" });
});

module.exports = server;
