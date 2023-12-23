exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('login', 50).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('role', 50).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};