var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post image responses, insert into db
router.post('/form', (req, res) => {
	console.log('post request to /form recieved', req.body);
//insert form info for specified user
	//++++Refactor to update authenticated user instead of inserting a new one
	db.insert({
		dob: req.body.dob,
		bloodType: req.body.bloodType,
		season: req.body.season,
		trained: req.body.trained,
		hobbies: req.body.hobbies,
		species: req.body.species,
		quote: req.body.quote,
		image: null
	}).into('users').where('id', req.userId)
		.then((res) => { console.log(res, "inserted form data, formRoutes line 25"); })
		.catch((err) => { console.error(err); });
	  res.sendStatus(200);
});

router.get('/form', (req, res) => {
	console.log('GET request to /form recieved');
//UserId hardcoded for testing, ++++REFACTOR+++++ to use req.body.userId
//Abstract the database functions out into utlities directory
  db('users').where({userId: req.body.userId}).select('*')
	  .then((data) =>{
      res.send(data);
    })
		.catch((err) => {
			console.error(err);
		})
});

module.exports = router;
