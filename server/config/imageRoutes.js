var express = require('express');
var router = express.Router();
var db = require('../db/index');
var imageUpload = require('../utilities/imageUpload');

// post image responses, insert into db
// router.post('/image', (req, res) => {
// 	console.log('post request to /image recieved', req.body.image);
// //selects image from users table where the user id matches the user that uploaded the photo and updates the image
//
// //insert image for a specific user
// 	db.update({ 'image': req.body.image }).into('users').where('email', req.body.email)
// 	  .then((data) => {
// 	  	return db.select('image').from('users').where('email', req.body.email);
// 	  })
// 	  .then((data) => res.send(data))
// 	  .catch((err) => console.error(err));
// });

router.post('/image', (req, res) => {
	console.log('request to /image recieved, jere is the req.body data, file, type...', req.body.filename,req.body.filetype);

  var image = imageUpload({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype
  }).then(onGoodImageProcess, onBadImageProcess);

  function onGoodImageProcess(resp) {
		console.log('complete, resp', resp);
    res.send({
      status: 'success',
      uri: resp
    });
  }

  function onBadImageProcess(resp) {
    res.send({
     status: 'error'
    });
  }

});


router.get('/image', (req, res) => {
	console.log('GET request to /image recieved');
//UserId hardcoded for testing, REFACTOR to use req.body.userId
  db('users').where({id: 1}).select('image')
	  .then((img) =>{
      res.send(img[0].image);
    })
		.catch((err) => {
			console.error(err);
		})
});

module.exports = router;
