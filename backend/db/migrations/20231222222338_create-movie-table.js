exports.up = function(knex) {
    return knex.schema.createTable('movie', table => {
        table.increments('id');
        table.string('title', 100).notNullable();
        table.string('genre', 100).notNullable();
        table.string('direction', 100).notNullable();
        table.string('distribution', 100).notNullable();
        table.integer('year').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movie');
};