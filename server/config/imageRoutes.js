"use strict";

var express = require('express');
var router = express.Router();
var db = require('../db/index');
var profileImageUploader = require('../utilities/profileImageUpload');
var UserImageUploader = require('../utilities/userImagesUpload');

router.post('/profileImage', (req, res) => {
	const onBadImageProcess = (resp) => res.send({status: 'error'});
	const onGoodImageProcess = (resp) => {
		db('users').update('image', resp.url).where('email', resp.email)
			.then((data) => res.send({status: 'success', uri: resp.url}))
			.catch((err) => console.log(err))
	}
	//send image info to profileImageUploader which returns a promise object which will be resolved when the s3 Bucket responds to the request
  var image = profileImageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype,
		email: req.body.email
  }).then(onGoodImageProcess, onBadImageProcess);
});

router.get('/profileImage', (req, res) => {
	let id = req.query.id;
  db('users').where('id', id).select('image')
		.then((data) => res.send(data))
});

router.get('/userImages', (req, res) => {
	let id = req.query.id;
  db('images').where('user_image_id', id).select('image', 'caption')
		.then((data) => res.send(data))
});

router.post('/userImages', (req, res) => {
	const onBadImageProcess = (resp) => res.send({status: 'error'});
	const onGoodImageProcess = (resp) => {
		db('images').insert({image: resp.url, caption: resp.caption, user_image_id: resp.id})
			.then((data) => {
				res.send({status: 'success', uri: resp.url, caption: resp.caption});
			})
			.catch((err) => console.log(err))
	}
	//send image info to profileImageUploader which returns a promise object which will be resolved when the s3 Bucket responds to the request
  var image = UserImageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype,
		id: req.body.id,
		caption: req.body.caption
  }).then(onGoodImageProcess, onBadImageProcess);
});

module.exports = router;
