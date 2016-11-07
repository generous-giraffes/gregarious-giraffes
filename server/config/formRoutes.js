const router = require('express').Router()
const db = require('../db/index')

// post survey responses
router.post('/form', function (req, res) {
	console.log('post request to /form recieved');
  res.sendStatus(200);
})

module.exports = router;
