var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var router = express.Router();


//initiate express
var app = express();

//Coors
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.header('Access-Control-Expose-Headers', 'token');
 next();
});

//middleware
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(bodyparser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
const routes = require('./config/routes');
app.use('/api', routes);

// require routes
var imageUpload = require('./config/imageRoutes');
var form = require('./config/formRoutes');
app.use('/api', imageUpload);
app.use('/api', form);

var request = require('request');
app.post('/api/pets', (req, res) => {
  //look up different methods than pet.getRandom
  // methods: https://www.petfinder.com/developers/api-docs#methods
  // var reqUrl = 'http://api.petfinder.com/pet.getRandom'

  //for some reason this did not work when the optional parameters were set up in options
  let reqUrl = 'http://api.petfinder.com/pet.getRandom?format=json&key=b9c347eeb65b532a17e0488aa46e77df&output=basic&animal=dog&location=10012';
  // + key get an api key from petfinder.com
  var options = {
    'method': 'GET',
    'url': reqUrl
    // ,
    // 'format': 'json',
    // 'key': 'b9c347eeb65b532a17e0488aa46e77df',
    // 'output': 'basic',
    // 'animal': req.body.animal || 'dog',
    // 'location': req.body.location || '10012'
  };
  console.log('req.bofy.animal', options );
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body, 'body from ANimal pets server')
    res.send(body);
  })
})
app.get('/api/pets/news', (req, res) => {
  //look up different methods than pet.getRandom
  // methods: https://www.petfinder.com/developers/api-docs#methods
  var reqUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  // + key get an api key from petfinder.com
  var options = {
    'method': 'GET',
    'url': reqUrl,
    'api-key': "e7e73dafa9814b9fb3801b53473b59a6",
    'q': "pets",
    'sort': "newest"
  };
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  })
})


// server serves index.html for all routes
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});

//set and run the port and server
app.set('port', process.env.PORT || 8080);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
