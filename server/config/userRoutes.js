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
	// db('users').count('name')
  Users.count()
	  .then((data) => res.send(data))
	  .catch((err) => console.error(err));
});

//add friends to friend table
router.post('/users/addFriend', (req, res) => {
  let friendEmail = req.body.friendEmail;
  let id = req.body.id;
  let friendId;
//first get id of user that is being friended
	// db('users').select('id').where('email', friendEmail)
  Users.findId(friendEmail)
    .then((data) => {friendId = data[0].id})//then add the userId and FriendId to the friends table
	  .then(() => {
      // db('friends').insert({
      //   user1_id: id,
      //   user2_id: friendId
      //  })
       Users.addFriend(id, friendId)
        // .then(() => db('users').select('*').where('id', friendId))
        .then(() => Users.getFriend(friendId))
        .then((data) => res.send(data))
	  })
	  .catch((err) => console.error(err));
});

//retrieve friends for profile page
router.get('/users/friends', (req, res) => {
  let id = req.query.id;
  // db('users').select('*').leftOuterJoin('friends', 'users.id', 'friends.user2_id')
  //   .where('friends.user1_id', id)
  Users.getFriends(id)
      .then((data) => res.send(data))
  	  .catch((err) => console.error(err));
});

//retrieve friend's photos
router.get('/users/friendsImages', (req, res) => {
  let id = req.query.id;
  // db('images').select('*').where('user_image_id', id)
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
  console.log(userId, friendId, 'user and friend ids +++++++');
  Users.removeFriend(friendId, userId)
    .then((data) => res.redirect('/api/users/friends?id=' + userId))
	  .catch((err) => console.error(err));
});

router.get('/users/search', (req,res) => {
  let name = req.query.name
    // db('users').select('*').where('name','like', `%${name}%`)
    Users.search(name)
      .then((data) => res.send(data))
      .catch((err) => console.error(err));
})


module.exports = router;
