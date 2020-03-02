exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([
        { id: 1, username: "ark", password: "hello" },
        { id: 2, username: "rick", password: "hello" },
        { id: 3, username: "morty", password: "hello" }
      ]);
    });
};
