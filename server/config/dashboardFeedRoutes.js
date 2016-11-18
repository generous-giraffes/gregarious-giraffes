'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');


//get all the users for the dashboard feed to show the latest ten
router.get('/users', (req, res) => {
    console.log('get request to /users received for DASH FEED');
    db('users').select('*')
        .then((data) => res.send(data))
        .catch((err) => console.error(err));
});


router.post('/dashboardComment', (req, res) => {
	db('imageComment')
		.then((data) => {
      console.log(data, 'data in doashboardComment post');
			res.send(data);
		})
		.catch((err) => console.log(err))
});
//this one may not be needed if the get to sashboarDimages gets the comments too
// router.get('/dashboardImageComments', (req, res) => {
// 	console.log('GET request to /dashboardImageComments recieved');
//   db('imageComment')
// 		.then((data) => {
// 			console.log(data, 'get /dashboardImageComments data')
// 			res.send(data);
// 		})
//     .catch((err) => console.log(err))
// });

router.get('/dashboardImages', (req, res) => {
	console.log('GET request to /dashboardImageComments recieved');
  db('images')
    .join('users as u', 'u.id', 'images.user_image_id')
    .select('u.name', 'images.image', 'images.caption')
    .limit(10)//change the limit when we decide on the layout, could add an offset that is incremented to get more/different images
		.then((data) => {
			console.log(data, 'get /dashboardImageComments data')
			res.send(data);
		})
    .catch((err) => console.log(err))
});


module.exports = router;
