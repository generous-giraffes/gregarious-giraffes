var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var path = require('path');

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



// require routes
//var routes = require('./config/routes.js');

//set and run the port and server
app.set('port', process.env.PORT || 8080);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
