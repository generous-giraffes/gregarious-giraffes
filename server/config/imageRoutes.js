var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post image responses, insert into db
router.post('/image', (req, res) => {
	console.log('post request to /image recieved', req.body.image);
//selects image from users table where the user id matches the user that uploaded the photo and updates the image

//inserting a user for testing purposes
//	db('users').insert({'username': 'tester', userId: 1, faveFood:'onions'})
//	  .then((res)=> console.log('user isnerted', res))
//insert image for a specific user
	db.insert({ 'image': req.body.image }).into('users').where('id', req.userId)
	.then((res) => { console.log(res, "inserted image"); })
	.catch((err) => { console.error(err); });
  res.sendStatus(200);
});

router.get('/image', (req, res) => {
	console.log('GET request to /image recieved');
//UserId hardcoded for testing, REFACTOR to use req.body.userId
  db('users').where({userId: 1}).select('image')
	  .then((img) =>{
      res.send(img[0].image);
    })
		.catch((err) => {
			console.error(err);
		})
});

module.exports = router;
