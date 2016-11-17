var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post chat responses - insert into db
router.post('/chat', (req, res) => {
    var message = req.body.comment.text;
    var userName = req.body.comment.author;
    console.log('post request to /chat received', message);
    db('chats')
        .insert({
            comment: message,
            name: userName
        })
        .then((data) => {
            return db('chats').select('*');
        })
        .then((data) => {
            console.log(data,' +++++this is data from chatRoutes')
            res.send(data)
        })
        .catch((err) => console.error(err));
});
//need this for users signing back in, otherwise info is passed around in state
router.get('/chat', (req, res) => {
    console.log('GET request to /chat received');

    db('chats').select('*')
        .then((data) => {
            console.log('+++data inside router.get()', data);
            res.json({data: data});
        })
        .catch((err) => {
            console.error(err);
        })
});

module.exports = router;
