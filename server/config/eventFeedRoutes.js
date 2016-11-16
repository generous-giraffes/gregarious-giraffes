'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');

//add events to attendingEvents table
router.post('/attendingEvents', (req, res) => {
    let id = req.body.id;
    let eventId;
//first get id of user that is being adding the event
    db('users').select('id')
        .then(() => {
            db('attendingEvents').insert({
                    user_id: id,
                    event_id: eventId
                })
                .then((data) => res.send(data))
        })
        .catch((err) => console.error(err));
});

//retrieve friends for profile page
router.get('/attendingEvents', (req, res) => {
    let id = req.query.id;
    db('users').select('*').leftOuterJoin('attendingEvents', 'user_id', 'event_id')
        .where('attendingEvents.user_id', id)
        .then((data) => res.send(data))
        .catch((err) => console.error(err));
});

module.exports = router;
