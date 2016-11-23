var express = require('express');
var router = express.Router();
var db = require('../db/index');
var form = require('../db/surveyForm');

// post image responses, insert into db
router.post('/form', (req, res) => {
	// db('users')
	//   .update({
	// 		dob: req.body.dob,
	// 		bloodType: req.body.bloodType,
	// 		season: req.body.season,
	// 		trained: req.body.trained,
	// 		hobbies: req.body.hobbies,
	// 		species: req.body.species,
	// 		quote: req.body.quote
	// 	})
	// 	.where('email', req.body.email)
		// .then((data) => {
		// 	console.log(req.body.email, 'form EMAIL ++++++');
		// 	return db.select('*').from('users').where('email', req.body.email);
		// })//this works but does not seem like is is a good way, should be able to add returning above
		form.update(req.body)
		 .then((data) => res.send(data))
		 .catch((err) => console.error(err));
});
//need this for users signing back in, otherwise info is passed around in state
router.get('/form', (req, res) => {
//Abstract the database functions out into utilities directory
  // db('users').where({userId: req.body.email}).select('*')
	form.fetch(req.body)
	  .then((data) => res.send(data))
		.catch((err) => console.error(err))
});

module.exports = router;
