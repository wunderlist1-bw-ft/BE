const express = require("express");
const server = express();

const userRoute = require("./Users/users_Route");
const todoRoute = require("./Todo_lists/todo_lists_Route");
const taskRoute = require("./Tasks/tasks_Route");

server.use(express.json());
server.use("/auth/users", userRoute);
server.use("/auth/todos", todoRoute);
server.use("/auth/tasks", taskRoute);

server.get("/", (req, res) => {
  res.send({ jarvis: "your are in sir" });
});

module.exports = server;
