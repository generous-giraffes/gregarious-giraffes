'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');

//get users for Dropdownlist on dashboard
router.post('/users', (req, res) => {
  let offset = req.body.offset || 0

	db('users').select('*').offset(offset).limit(10)
	  .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//get number of users in db for dropdownlist on dashboard
router.get('/users/count', (req, res) => {
	console.log('post request to /users/count recieved');
	db('users').count('name')
	  .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//add friends to friend table
router.post('/users/friend', (req, res) => {
  let friendEmail = req.body.friendEmail;
  let id = req.body.id;
  let friendId;
//first get id of user that is being friended
	db('users').select('id').where('email', friendEmail)
    .then((data) => {friendId = data[0].id})//then add the userId and FriendId to the friends table
	  .then(() => {
      db('friends').insert({
        user1_id: id,
        user2_id: friendId
       })
        .then(() => db('users').select('*').where('id', friendId))
        .then((data) => res.send(data))
	  })
	  .catch((err) => console.error(err));
});

//retrieve friends for profile page
router.get('/users/friends', (req, res) => {
  let id = req.query.id;
  db('users').select('*').leftOuterJoin('friends', 'users.id', 'friends.user2_id')
    .where('friends.user1_id', id)
      .then((data) => res.send(data))
  	  .catch((err) => console.error(err));
});

router.get('/users/search', (req,res) => {
  let name = req.query.name
    db('users').select('*').where('name', name)
      .then((data) => {
        console.log(data, 'search function data');
        res.send(data);
      })
})


module.exports = router;
