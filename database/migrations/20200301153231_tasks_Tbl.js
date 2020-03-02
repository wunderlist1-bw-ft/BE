exports.up = function(knex) {
  return knex.schema.createTable("Tasks", tbl => {
    tbl.increments();
    tbl
      .string("name", 256)
      .notNullable()
      .unique()
      .index();
    tbl.string("description", 256);
    tbl.date("start_Date");
    tbl.date("end_date");
    tbl.boolean("completed").defaultTo(false);
    tbl
      .integer("todo_list_Id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Todo_List")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Tasks");
};
