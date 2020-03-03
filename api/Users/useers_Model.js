const db = require("../../database/Dbconfig.js");

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
function add(body) {
  return db("Users").insert({ ...body });
}
function del(id) {
  return db("Users")
    .where({ id })
    .del();
}
function update(id, body) {
  return db("Users")
    .where({ id })
    .update({ ...body });
}
function findBy(filter) {
  return db("Users").where(filter);
}
function findById(id) {
  return db("Users").where({ id });
}
