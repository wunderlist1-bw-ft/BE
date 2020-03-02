exports.up = function(knex) {
  return knex.schema.createTable("Users", tbl => {
    tbl.increments();
    tbl
      .string("username")
      .notNullable()
      .index();
    tbl.string("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};
