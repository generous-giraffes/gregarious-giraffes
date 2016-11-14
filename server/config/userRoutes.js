var express = require('express');
var router = express.Router();
var db = require('../db/index');

//get users for infinite scrolling on dashboard
router.post('/users', (req, res) => {
  let offset = req.body.offset || 0

	db('users').select('name', 'email', 'image').offset(offset).limit(10)
	  .then((data) => {
      console.log('data from in user routes', data);
	  	res.send(data);
	  })
	  .catch((err) => console.error(err));
});

router.get('/users/count', (req, res) => {
	console.log('post request to /users/count recieved');
	db('users').count('name')
	  .then((data) => {
	  	res.send(data);
	  })
	  .catch((err) => console.error(err));
});

module.exports = router;
