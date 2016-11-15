var express = require('express');
var router = express.Router();
var db = require('../db/index');

//get users for Dropdownlist on dashboard
router.post('/users', (req, res) => {
  let offset = req.body.offset || 0

	db('users').select('name', 'email', 'image').offset(offset).limit(10)
	  .then((data) => {
      console.log('data from in user routes', data);
	  	res.send(data);
	  })
	  .catch((err) => console.error(err));
});
//get number of users in db for dropdownlist on dashboard
router.get('/users/count', (req, res) => {
	console.log('post request to /users/count recieved');
	db('users').count('name')
	  .then((data) => {
	  	res.send(data);
	  })
	  .catch((err) => console.error(err));
});
//add friends to friend table
router.post('/users/friend', (req, res) => {
  let email1 = req.body.email1;
  let email2 = req.body.email2;
  let userId1, userId2;

	db('users').select('id').where('email', email1)
    .then((data) => {
      userId1 = data[0].id;
      return db('users').select('id').where('email', email2);
    })
	  .then((data) => {
      userId2 = data[0].id;
      db('friends').insert({
        user1_id: userId1,
        user2_id: userId2,
        user1_id: userId2,
        user2_id: userId1
       })
        .then((data) => res.send(data))
	  })
	  .catch((err) => console.error(err));
});
//retrieve friends for profile page
router.post('/users/friends', (req, res) => {
  let id = req.body.id;
  db('users').select('*').leftOuterJoin('friends', 'users.id', 'friends.user2_id').where('users.id', id)
    .then((data) => {
      console.log(data, 'user friends retrival data');
      res.send(data)
    })
	  .catch((err) => console.error(err));
});

module.exports = router;
