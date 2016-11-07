var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var db = require('./db/index');
//initiate express
var app = express();

//middleware
app.use(bodyparser.urlencoded({extended: true}));
 app.use(bodyparser.json());
app.use(bodyparser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
//require('./config/api-router.js')(app, express);

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

// require routes
//var routes = require('./config/routes.js');



//TEST
app.post('/api/image', (req, res) => {
	console.log('++++++++++++post request to /image recieved', req.body.image);
//move this into utilities and then require it
//selects image from users table where the user id matches the user that uploaded the photo and updates the image
  db('users').insert({'username': 'tester', userId: 1, faveFood:'onions'}).then((res)=> console.log('++++++++++user isnerted', res))
  db.insert({'image': req.body.image}).into('users').where('id', req.userId)
	.then((res) => { console.log(res, "inserted image"); })
	.catch((err) => { console.error(err); });
  res.sendStatus(200);
})

app.get('/api/image', (req, res) => {
	console.log('++++++++++++get request to /image recieved');
  db('users').where({userId: 1}).select('image').then((img) =>{
    console.log('+========',img[0].image);
    res.send(img[0].image)
  })

  // res.send(img);
})

//TEST


//set and run the port and server
app.set('port', process.env.PORT || 8080);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
