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
    db('attendingEvents')
        .insert({ user_id: user_id, event_id: event_id})
        .then((data) => {
            event_id = data[0].id;
            console.log(data, 'this is the data from the eventFEED ROUTES');
            res.send(data);
    })
    .catch((err) => console.error(err))
});

//retrieve events for a specific user's profile page
router.get('/attendEvent', (req, res) => {
    let userId = req.query.userid;
    db('users')
      .join('attendingEvents as aE', 'users.id', '=', 'aE.user_id')
      .join('events as e', 'e.id', '=', 'aE.event_id')
      .where('users.id', userId)
      .distinct('user_id', 'event_id')
      .select('e.name', 'e.location', 'e.date', 'e.time', 'e.gifts', 'e.animals', 'e.eating', 'e.danger', 'e.address', 'e.coordinates')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => console.error(err));
});

//get events from searches:
router.get('/searchEvents/user', (req, res) => {
  let userName = req.query.userName;
  //  SELECT u.name, event_id, e.location, e.date, e.time from users as u INNER JOIN attendingEvents as a on u.id = a.user_id INNER JOIN events as e on a.event_id = e.id;
  //this is not doing what it is supposed to
  db.select('e.name', 'e.location', 'e.date', 'e.time', 'e.gifts', 'e.animals', 'e.eating', 'e.danger', 'e.address', 'e.coordinates')
    .from('users as u')
    .where('u.name', 'like', `%${userName}%`)
    .join('attendingEvents as aE', 'u.id', '=', 'aE.user_id')
    .join('events as e', 'e.id', '=', 'aE.event_id')
      .then((data) => res.send(data))//WORK ON A SELECTION FOR ATTENDING, MAY NEED TO FILTER ON FRONT END OR HERE, probably here
      .catch((err) => console.error(err));
});

//gets the events that a user is searching
router.get('/searchEvents/event', (req, res) => {
  let eventName = req.query.eventName;
  db('events')
    .select('*')
    .where('name', 'like', `%${eventName}%`)
      .then((data) => res.send(data))
      .catch((err) => console.error(err));
});

module.exports = router;
