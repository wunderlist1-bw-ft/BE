const router = require("express").Router();
const userdb = require("../Users/useers_Model");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log("users");
  userdb
    .all()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = crypt.hashSync(user.password, 10);
  user.password = hash;
  if (user.username && user.password) {
    userdb
      .add(user)
      .then(ele => {
        res.status(200).json({ Message: `${user.username} has been added` });
      })
      .catch(err => {});
  } else {
    res.status(500).json({ Error: "Needs username, password" });
  }
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;
  userdb
    .findBy({ username })
    .first()
    .then(ele => {
      if (ele && crypt.compareSync(password, ele.password)) {
        const token = genToken(ele);
        res.status(200).json({ M: "You have logged in", token });
      } else {
        res.status(401).json({ Error: "Invalid login" });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;

function genToken(user) {
  const payload = {
    username: user.username
  };
  const secret = "the blood sings to me";
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}
