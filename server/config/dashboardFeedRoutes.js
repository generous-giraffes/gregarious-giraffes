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
//insert comment data into db
router.post('/dashboardComment', (req, res) => {
  let user_comment_id = req.body.id;
  let comment = req.body.comment;
  let image_id = req.body.imageId;
  let userImageId = req.body.user_image_id;
  let commenter_name = req.body.userName;
  //es6 property value shorthand
	db('imageComment').insert({
    comment,
    image_id,
    userImageId,
    commenter_name
  })//refactored to user redirect instead of writing the commented out join tables again
    .then(() => { res.redirect('/api/dashboardImages')
      // return db('images')
      //   .join('imageComment as ic', 'ic.image_id', '=', 'images.id')
      //   .join('users as u', 'u.id', '=', 'ic.user_comment_id')
      //   .select('ic.comment', 'u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id')
    })
		// .then((data) => {
    //   console.log(data, 'data in doashboardComment post');
		// 	res.send(data);
		// })
		.catch((err) => console.log(err))
});
//return photos with info on the user who uploaded the photo, and any comments
router.get('/dashboardImages', (req, res) => {
	console.log('GET request to /dashboardImages recieved');
  db('images')
    .join('users as u', 'u.id', '=', 'images.user_image_id')
    .leftOuterJoin('imageComment as ic', 'ic.image_id', 'images.id')
    .select('u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id', 'ic.comment', 'ic.commenter_name')
    // .limit(10)//change the limit when we decide on the layout, could add an offset that is incremented to get more/different images
		.then((data) =>
{
  console.log(data, 'dat awiht commenting user id');
  res.send(data)
}
  )
    .catch((err) => console.log(err))
});

router.get('/dashboardBdays', (req, res) => {
  console.log('get request to /dashboardBdays recieved, month:', req.query.month);
  let month = req.query.month;
  db('users').select('*').where('dob', 'like', `%-${month}-%`)
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
})


module.exports = router;
