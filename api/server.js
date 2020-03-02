require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");

const userRoute = require("./Users/users_Route");
const todoRoute = require("./Todo_lists/todo_lists_Route");
const taskRoute = require("./Tasks/tasks_Route");

server.use(cors());
server.use(express.json());
server.use("/api/auth/users", userRoute);
server.use("/api/auth/todos", todoRoute);
server.use("/api/auth/tasks", taskRoute);

server.get("/", (req, res) => {
  res.send({ jarvis: "your are in sir" });
});

module.exports = server;
