const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
    await knex('user').del();
    await knex('user').insert([
        {
            login: 'admin',
            password: bcrypt.hashSync('1234'),
            role: 'ADMIN'
        }
    ]);
};