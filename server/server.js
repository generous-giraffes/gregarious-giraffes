var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var router = express.Router();
var jwt = require('jsonwebtoken');


//initiate express
var app = express();

//Coors
app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Request-Headers", "*");
 res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
 res.header("Access-Control-Allow-Credentials", "true");
 next();
});

//middleware
app.use(bodyparser.urlencoded({extended: true}));
 app.use(bodyparser.json());
app.use(bodyparser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
//require('./config/api-router.js')(app, express);
var users = require('./config/routes');

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {

 // check header or url parameters or post parameters for token
 var token = req.body.token || req.query.token || req.headers['x-access-token'];

 // decode token
 if (token) {
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
   if (err) {
    return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
   } else {
    req.user = user;
    next();
   }
  });
 } else {
  next();
 }
});

var staticPath = 'client';

app.use('/api/', users);
app.use(express.static(staticPath));
app.use('/', express.static(staticPath));
app.use('/validateEmail/*', express.static(staticPath));


// error handlers
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
 console.dir(err);
 res.status(err.status || 500);
 if (err.status === 500) {
  console.error(err.stack);
  res.json({error: 'Internal Server Error'});
 }
 else if (err.status === 404) {
  res.render('error');    //render error page
 } else {
  res.json({error: err.message})
 }
});

var formRoutes = require('./config/formRoutes');
//use routes
app.use('/api', formRoutes);

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
