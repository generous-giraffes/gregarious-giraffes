const router = require('express').Router()
const db = require('../db/index')

// post survey responses
router.post('/form', util.checkToken, function (req, res) {
	console.log('post request to /form recieved');
  res.sendStatus(200);
})
