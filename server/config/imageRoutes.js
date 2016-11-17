var express = require('express');
var router = express.Router();
var db = require('../db/index');
var ImageUploader = require('../utilities/imageUpload');

router.post('/image', (req, res) => {
	const onBadImageProcess = (resp) => res.send({status: 'error'});
	const onGoodImageProcess = ({email, url}) => {
		db('users').update('image', url).where('email', email)
			.then((data) => {
				res.send({status: 'success', uri: url});
			})
			.catch((err) => console.log(err))
	}

	//send image info to imageUploader which returns a promise object which will be resolved when the s3 Bucket responds to the request
  var image = ImageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype,
		email: req.body.email
  }).then(onGoodImageProcess, onBadImageProcess);
});

//UPDATE THIS ++++++++++++
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
