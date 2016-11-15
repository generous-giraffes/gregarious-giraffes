var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post image responses, insert into db
router.post('/eventForm', (req, res) => {
    console.log('post request to /eventForm received', req.body);
    db('events')
        .insert({
            time: req.body.time,
            date: req.body.date,
            gifts: req.body.gifts,
            location: req.body.location,
            name: req.body.name,
            danger: req.body.danger,
            animals: req.body.animals,
            eating: req.body.eating
        })
        .then((data) => {
            return db('events').select('*');
        })
        .then((data) => {
            console.log(data,' this is the data in the eventFormRoutes')
            res.send(data)
        })
        .catch((err) => console.error(err));
});
//need this for users signing back in, otherwise info is passed around in state
router.get('/eventForm', (req, res) => {
    console.log('GET request to /eventForm received');
//Abstract the database functions out into utilities directory
    db('events').select('*')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        })
});

module.exports = router;
