'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');

//add events to attendingEvents table
router.post('/attendEvent', (req, res) => {
    let user_id = req.body.user_id;
    let event_id = req.body.event_id;
    console.log(req.body, 'seeing if this is the right id');
    console.log(event_id, 'seeing if this is the right event_id');
    db('attendingEvents').insert({
        user_id: user_id,
        event_id: event_id
    }).then((data) => {
            event_id = data[0].id;
            console.log(data, 'this is the data from the eventFEED ROUTES');
            res.send(data);
    })
    .catch((err) => console.error(err))
});

//retrieve friends for profile page
router.get('/attendEvent', (req, res) => {
    let user_id = req.query.id;
    let event_id = req.query.event_id;
    db('users').select('*').fullOuterJoin('attendingEvents', 'user_id', 'event_id')
        .where('attendingEvents.user_id', event_id)
        .then((data) => {
            console.log(data, 'data for the join table attending events!');
            res.send(data);
        })
        .catch((err) => console.error(err));
});

module.exports = router;
