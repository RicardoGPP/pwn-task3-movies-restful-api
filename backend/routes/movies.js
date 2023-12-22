//Imports required dependencies.
const express = require('express');
const knexconfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexconfig);
const jwt = require('jsonwebtoken');

//Creates a new route to be used by movies.
const router = express.Router();

//Defines the movie movieTable name.
const movieTable = 'movie';
const userTable = 'user';

//Define 'token check' middleware.
const isTokenValid = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Token not found.');
    } else {
        const splitted = auth.split(' ');
        const type = splitted[0];
        const token = splitted[1];

        if (type != 'Bearer') {
            res.status(401).send(`Invalid authentication type: ${type}.`);
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
                if (error) {
                    res.status(401).json(`Invalid token: ${error.message}.`);
                } else {
                    req.token = data;
                    next();
                }
            });
        }
    }
};

//Defines 'administrator check' middleware.
const isAdmin = (req, res, next) => {
    knex(userTable)
        .where({ id: req.token.id })
        .first()
        .then(user => {
            if (!user) {
                res.status(404).send('User not found.');
            } else if (req.token.role != 'ADMIN') {
                res.status(403).send('Unauthorized.');
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(500).send(`Error checking if user is admin: ${error.message}`);
        });
}

//Sets 'post movie' middleware.
router.post('/', isTokenValid, isAdmin, (req, res) => {
    knex(movieTable)
        .insert(req.body)
        .then(ids => {
            return knex(movieTable)
                .where({id: ids[0]})
                .first();
        })
        .then(movie => res.status(201).json(movie))
        .catch(error => res.status(500).send(`Error inserting movie: ${error.message}.`))
});

//Sets 'get all movies' middleware.
router.get('/', isTokenValid, (_, res) => {
    knex(movieTable)
        .select('*')
        .then(movies => res.status(200).json(movies))
        .catch(error => res.status(500).send(`Error getting movies: ${error.message}.`))
});

//Sets 'get movie by id' middleware.
router.get('/:id', isTokenValid, (req, res) => {
    const id = req.params.id;

    knex(movieTable)
        .select('*')
        .where({id})
        .first()
        .then(movie => {
            if (!movie) {
                res.status(404).send(`No movie could be found with ID ${id}.`);
            } else {
                res.status(200).json(movie);
            }
        })
        .catch(error => res.status(500).send(`Error getting movie of ID ${id}: ${error.message}.`));
});

//Sets 'put movie' middleware.
router.put('/:id', isTokenValid, isAdmin, (req, res) => {
    const id = req.params.id;

    knex(movieTable)
        .where({id})
        .update(req.body)
        .then(() => {
            return knex(movieTable)
                .select('*')
                .where({id})
                .first();
        })
        .then(movie => {
            if (!movie) {
                res.status(404).send(`No movie could be found with ID ${id}.`);
            } else {
                res.status(200).json(movie)
            }
        })
        .catch(error => res.status(500).send(`Error updating movie of ID ${id}: ${error.message}.`));
});

//Sets 'delete movie' middleware.
router.delete('/:id', isTokenValid, isAdmin, (req, res) => {
    const id = req.params.id;

    knex(movieTable)
        .select('*')
        .where({id})
        .first()
        .then(movie => {
            if (!movie) {
                return Promise.resolve(null);
            }
            return knex(movieTable)
                    .where({id})
                    .delete()
                    .then(() => movie);
        })
        .then(movie => {
            if (!movie) {
                res.status(404).send(`No movie could be found with ID ${id}.`);
            } else {
                res.status(200).json(movie)
            }
        })
        .catch(error => res.status(500).send(`Error deleting movie of ID ${id}: ${error.message}.`));
});

//Exports router.
module.exports = router;