//Imports required dependencies.
const express = require('express');
const knexconfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexconfig);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = express.Router();

//Defines the user table name.
const table = 'user';

//Sets the 'register' middleware.
auth.post('/register', (req, res) => {
    const user = {
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password),
        role: 'USER'
    };

    knex(table)
        .insert(user)
        .then(() => res.status(201).send())
        .catch(error => res.status(500).send(`Error registering user: ${error.message}.`))
});

//Sets the 'login' middleware.
auth.post('/login', (req, res) => {
    const { login, password } = req.body;

    knex(table)
        .where({ login })
        .first()
        .then(user => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(403).send(`Invalid login and/or password.`);
            } else {
                jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '24h'
                    },
                    (error, token) => {
                        if (error) {
                            res.status(500).json({ error });
                        } else {
                            res.status(200).json({ token });
                        }
                    }
                );
            }
        })
        .catch(error => {
            res.send(500).send(`Error logging in user ${login}: ${error.message}.`);
        })
});

//Exports router.
module.exports = auth;