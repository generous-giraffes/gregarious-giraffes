'use strict';

const express = require('express');
const auth = require('./auth');

const router = express.Router();

//hits the endpoint for log in
router.post('/login', (req, res) => {
    auth.loginUser(req, res)
        .then((promise) => {
            res.set('token', promise.token);
            res.json(promise.data);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        });
});

//hits the endpoint for signup
router.post('/signup', (req, res) => {
    auth.addNewUser(req, res)
        .then((promise) => {
            console.log('promise from /signup in routes.js: ', promise)
            res.set('token', promise.token);
            res.json(promise.data);
        })
        .catch((err) => {
            console.log('Error routes.js /signup: ', err);
            res.status(400);
            res.send(err);
        });
});

module.exports = router;