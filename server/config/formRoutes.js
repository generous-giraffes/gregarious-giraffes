const router = require('express').Router()
const db = require('../db/index')

// post survey responses, insert into db
router.post('/form', (req, res) => {
	console.log('post request to /form recieved');
  res.sendStatus(200);
})

module.exports = router;
