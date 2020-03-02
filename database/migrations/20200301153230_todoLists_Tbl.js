exports.up = function(knex) {
  return knex.schema.createTable("Todo_List", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .notNullable()
      .unique()
      .index();
    tbl.boolean("completed").defaultTo(false);
    tbl
      .integer("User_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Todo_List");
};
