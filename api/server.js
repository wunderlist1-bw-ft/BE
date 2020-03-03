require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");

const userRoute = require("./Users/users_Route.js");
const todoRoute = require("./Todo_lists/todo_lists_Route");
const taskRoute = require("./Tasks/tasks_Route.js");
const restrict = require("./restriction/restrict_Middleware");

server.use(express.json());
server.use(cors());
server.use("/api/auth/users", userRoute);
server.use("/api/auth/todos", restrict, todoRoute);
server.use("/api/auth/tasks", restrict, taskRoute);

server.get("/", (req, res) => {
  res.send({ jarvis: "your are in sir" });
});

module.exports = server;
