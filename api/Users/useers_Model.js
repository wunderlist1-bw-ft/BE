const db = require("../../database/Dbconfig.js");
const crypt = require("bcryptjs");

module.exports = {
  all,
  add,
  del,
  update,
  findById,
  findBy
};

function all() {
  return db("Users");
}
function add() {}
function del() {}
function update() {}
function findBy() {}
function findById() {}
