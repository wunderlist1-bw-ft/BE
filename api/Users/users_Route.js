const route = require("express").Router();
const userDb = require("./useers_Model");

route.get("/", (req, res) => {
  console.log("users");
  userDb
    .all()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = route;
