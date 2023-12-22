exports.seed = async function(knex) {
    await knex('movie').del();
    await knex('movie').insert([
        {
            title: 'Harry Potter e a Pedra Filosofal',
            genre: 'Aventura',
            direction: 'Chris Columbus',
            distribution: 'Warner Bros. Pictures',
            year: 2001
        },
        {
            title: 'Senhor dos Anéis: A Sociedade do Anel',
            genre: 'Aventura',
            direction: 'Barrie M. Osborne, Peter Jackson, Fran Walsh e Tim Sanders',
            distribution: 'New Line Cinema',
            year: 2001
        },
        {
            title: 'Matrix',
            genre: 'Ação, Ficção Científica',
            direction: 'Lilly Wachowski e Lana Wachowski',
            distribution: 'Warner Bros. Pictures',
            year: 1999
        }
    ]);
};