const db = require("../../database/Dbconfig.js");
const crypt = require("bcryptjs");

module.exports = {
  all,
  add,
  del,
  update,
  findById
};

function all() {
  return db("Tasks");
}
function add(body) {
  return db("Tasks").insert({ ...body });
}
function del(id) {
  return db("Tasks")
    .where({ id })
    .del();
}
function update(id, body) {
  return db("Tasks")
    .where({ id })
    .update(body);
}

function findById(id) {
  return db("Tasks").where({ id });
}
