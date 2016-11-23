'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post image responses, insert into db
router.post('/eventForm', (req, res) => {
    console.log('post request to /eventForm received', req.body);
    let user_id = req.body.user_id;
    db('events')
      .returning('id')//need to return event id to add to attending events, so when a user creates an event they are automatically attending
      .insert({
          time: req.body.time,
          date: req.body.date,
          gifts: req.body.gifts,
          location: req.body.location,
          name: req.body.name,
          danger: req.body.danger,
          animals: req.body.animals,
          eating: req.body.eating,
          address: req.body.address,
          coordinates: req.body.coordinates
        })
        .then((event_id) => db('attendingEvents').insert({ user_id: user_id, event_id: event_id }))
        .then(() => db('events').select('*'))
        .then((data) =>res.send(data))
        .catch((err) => console.error(err));
});
//need this for users signing back in, otherwise info is passed around in state
router.get('/eventForm', (req, res) => {
    console.log('GET request to /eventForm received');
//Abstract the database functions out into utilities directory
    db('events')
        .select('*')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        })
});

module.exports = router;
