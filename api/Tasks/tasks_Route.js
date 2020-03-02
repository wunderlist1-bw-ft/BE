const route = require("express").Router();
const taskDb = require("./tasks_Model");

route.get("/", (req, res) => {
  taskDb
    .all()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
    });
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  taskDb
    .findById(id)
    .then(ele => {
      if (ele.length > 0) {
        res.status(200).json(ele);
      } else res.status(404).json({ ERROR: "No task found with that id" });
    })
    .catch(err => {
      console.log(err);
    });
});

route.post("/add", checkBody, (req, res) => {
  const body = req.body;
  taskDb
    .add(body)
    .then(ele => {
      res.status(200).json({ Message: "Added Successfully" });
    })
    .catch(err => {
      console.log(err);
    });
});

route.post("/:id", checkBody, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  taskDb
    .update(id, body)
    .then(ele => {
      res.status(200).json(body);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = route;

function checkBody(req, res, next) {
  const { name, todo_list_Id } = req.body;
  if (name && todo_list_Id) {
    next();
  } else {
    res.status(500).json({ ERROR: "You need a name and todo list id" });
  }
}
