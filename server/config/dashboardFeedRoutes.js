'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');


//get all the users for the dashboard feed to show the latest ten
router.get('/users', (req, res) => {
    console.log('get request to /users received for DASH FEED');
    db('users').select('*')
        .then((data) => res.send(data))
        .catch((err) => console.error(err));
});


module.exports = router;
