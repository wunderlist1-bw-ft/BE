const router = require("express").Router();
const userdb = require("../Users/useers_Model");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log("users");
  userdb
    .all()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ ERROR: "no users found" });
      }
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
      .catch(err => {
        res.status(500).json({ ERROR: err.message });
      });
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

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  userdb
    .del(id)
    .then(ele => {
      if (ele === 1) {
        res.status(200).json({ Message: "Removed succeeded" });
      } else {
        res.status(500).json({ ERROR: "Could not delete" });
      }
    })
    .catch(err => {
      console.log(err);
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
