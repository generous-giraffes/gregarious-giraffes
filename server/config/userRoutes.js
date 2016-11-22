'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');
var Users = require('../db/users');

//get users for Dropdownlist on dashboard
router.post('/users', (req, res) => {
  let offset = req.body.offset || 0
	// db('users').select('*').offset(offset).limit(10)
  Users.get10(offset)
	  .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//get number of users in db for dropdownlist on dashboard
router.get('/users/count', (req, res) => {
  Users.count()
	  .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//add friends to friend table
router.post('/users/addFriend', (req, res) => {
  let friendEmail = req.body.friendEmail;
  let id = req.body.id;
  //get the id of the user being friended, then add that friend, if the users are allready friends then send an error else send back the data for the added friend
  Users.findId(friendEmail)
	  .then((friendId) => {
       Users.addFriend(id, friendId)
        .then((data) => {
          if(data.error) {
            res.status(500).send('already friends')
            return;
          }
          return Users.getFriend(friendId);
        })
        .then((data) => res.send(data))
	  })
});

//retrieve friends for profile page
router.get('/users/friends', (req, res) => {
  let id = req.query.id;
  Users.getFriends(id)
      .then((data) => res.send(data))
  	  .catch((err) => console.error(err));
});

//retrieve friend's photos
router.get('/users/friendsImages', (req, res) => {
  let id = req.query.id;
  Users.getFriendPhotos(id)
    .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//retrieve friend's events
router.get('/users/friendsEvents', (req, res) => {
  let id = req.query.id;
  Users.getFriendEvents(id)
    .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//retrieve friend's friends
router.get('/users/friendsFriends', (req, res) => {
  let id = req.query.id;
  Users.getFriends(id)
    .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

router.get('/users/removeFriend', (req, res) => {
  let friendId = req.query.friendId;
  let userId = req.query.userId;
  Users.removeFriend(friendId, userId)
    .then((data) => res.redirect('/api/users/friends?id=' + userId))
	  .catch((err) => console.error(err));
});

router.get('/users/search', (req,res) => {
  let name = req.query.name
    Users.search(name)
      .then((data) => res.send(data))
      .catch((err) => console.error(err));
})


module.exports = router;
