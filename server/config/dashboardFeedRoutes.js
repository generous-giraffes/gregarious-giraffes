'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/index');


//get all the users for the dashboard feed to show the latest ten
router.get('/dashboardUsers', (req, res) => {
    console.log('get request to /users received for DASH FEED');
    db('users')
        .select('*')
        .limit(10)
        .then((data) => res.send(data))
        .catch((err) => console.error(err));
});

router.post('/dashboardComment', (req, res) => {
  let id = req.body.id;
  let comment = req.body.comment;
  let image_id = req.body.imageId;
  let userImageId = req.body.user_image_id;
  console.log(id, comment, image_id,userImageId, 'id and comment in dashBoard comment++++');
	db('imageComment').insert({
    user_comment_id: id,
    comment,
    image_id,
    userImageId
  })
    .then(() => {
      return db('images')
        .join('imageComment as ic', 'ic.image_id', '=', 'images.id')
        .join('users as u', 'u.id', '=', 'ic.user_comment_id')
        .select('ic.comment', 'u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id')
    })
		.then((data) => {
      console.log(data, 'data in doashboardComment post');
			res.send(data);
		})
		.catch((err) => console.log(err))
});
//version that works without getting comments
// router.get('/dashboardImages', (req, res) => {
// 	console.log('GET request to /dashboardImageComments recieved');
//   db('images')
//     .join('users as u', 'u.id', '=', 'images.user_image_id')
//     .select('u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id')
//     .limit(10)//change the limit when we decide on the layout, could add an offset that is incremented to get more/different images
// 		.then((data) => {
// 			console.log(data, 'get /dashboardImageComments data')
// 			res.send(data);
// 		})
//     .catch((err) => console.log(err))
// });

//attempt to get comments here, requires filtering on front end
router.get('/dashboardImages', (req, res) => {
	console.log('GET request to /dashboardImages recieved');
  db('images')
    .join('users as u', 'u.id', '=', 'images.user_image_id')
    .leftOuterJoin('imageComment as ic', 'ic.image_id', 'images.id')
    .select('u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id', 'ic.comment')
    // .limit(10)//change the limit when we decide on the layout, could add an offset that is incremented to get more/different images
		.then((data) => {
			console.log(data, 'get /dashboardImages data')
			res.send(data);
		})
    .catch((err) => console.log(err))
});


module.exports = router;

//this one may not be needed if the get to dashboardImageComments gets the comments too
// router.get('/dashboardImageComments', (req, res) => {
// 	console.log('GET request to /dashboardImageComments recieved');
//   db('imageComment')
// 		.then((data) => {
// 			console.log(data, 'get /dashboardImageComments data')
// 			res.send(data);
// 		})
//     .catch((err) => console.log(err))
// });
