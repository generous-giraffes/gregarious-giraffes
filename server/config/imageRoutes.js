const router = require('express').Router();
const db = require('../db/index');

// post image responses, insert into db
router.post('/image', (req, res) => {
	console.log('post request to /image recieved');
//move this into utilities and then require it
//selects image from users table where the user id matches the user that uploaded the photo and updates the image
	db.insert({'image': req.image}).into('users').where('id', req.userId)
	.then((res) { console.log(res, "inserted image"); })
	.catch((err) => { console.error(err); });
  res.sendStatus(200);
})

module.exports = router;
