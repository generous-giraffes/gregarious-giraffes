var express = require('express');
var router = express.Router();
var db = require('../db/index');

// post chat responses - insert into db
router.post('/chat', (req, res) => {
    var comment = req.body.comment.text; //data from saveChat is req.body (from the post request - only the client does the post request)
    var name = req.body.user.name;
    console.log('post request to /chat received', comment);
    db('chats')
        .insert({
            comment: comment,
            name: name
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
            //this is the data server is sending down from the GET request: {"data":[{"id":1,"name":"skipo","comment":"hey my name is skipo"}]}
            console.log('+++data inside router.get()', data);
            res.json({data: data});
        })
        .catch((err) => {
            console.error(err);
        })
});

module.exports = router;
