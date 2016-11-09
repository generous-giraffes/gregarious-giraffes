'use strict';

const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.route('/', auth.checkUser)
    .post((req, res) => {
        let userData = req.body.user;
        //calls database and saves user profile
    })
    .put((req, res) => {
        let userData = req.body.user.params;
        //calls database and modifies a user profile;
    })
    .delete((req, res) => {
        let userName = req.body.user.username;
        //calls a database function that deletes the specified user
    });

module.exports = router;
