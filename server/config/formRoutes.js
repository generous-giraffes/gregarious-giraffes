var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post image responses, insert into db
router.post('/form', (req, res) => {
	console.log('post request to /form recieved', req.body);
	db('users')
	  .update({
			dob: req.body.dob,
			bloodType: req.body.bloodType,
			season: req.body.season,
			trained: req.body.trained,
			hobbies: req.body.hobbies,
			species: req.body.species,
			quote: req.body.quote
		})
		.where('email', req.body.email)
		// .returning('*') //this was not working, can also add returning as the next argument to update but that did not work either
		.then((data) => {
			console.log(req.body.email, 'form EMAIL ++++++');
			return db.select('*').from('users').where('email', req.body.email);
		})//this works but does not seem like is is a good way, should be able to add reutnring above
		 .then((data) => res.send(data))
		 .catch((err) => console.error(err));
});
//need this for users signing backin, otherwise info is passed around in state
router.get('/form', (req, res) => {
	console.log('GET request to /form recieved');
//Abstract the database functions out into utlities directory
  db('users').where({userId: req.body.email}).select('*')
	  .then((data) =>{
      res.send(data);
    })
		.catch((err) => {
			console.error(err);
		})
});

module.exports = router;
