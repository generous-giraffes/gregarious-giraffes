const router = require('express').Router()
const db = require('../db/index')

// post image responses, insert into db
router.post('/image', (req, res) => {
	console.log('post request to /image recieved');
  res.sendStatus(200);
})
