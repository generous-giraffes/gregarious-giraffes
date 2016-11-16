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

//This is needed for socket.io to work
var http = require('http').Server(app)
var io = require('socket.io')(http);

//Coors
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.header('Access-Control-Expose-Headers', 'token');
 next();
});

//middleware
//remove limit when switch to s3 bucket
app.use(bodyparser.json({limit: "1.6mb"}));
app.use(bodyparser.urlencoded({limit: "1.6mb", extended: true, parameterLimit:50000}));
app.use(bodyparser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
const routes = require('./config/routes');
app.use('/api', routes);

// require routes
var imageUpload = require('./config/imageRoutes');
var form = require('./config/formRoutes');
var eventForm = require('./config/eventFormRoutes');
var attendEvent = require('./config/eventFeedRoutes');
var petApi = require('./config/petApiRoutes');
var users = require('./config/userRoutes');
app.use('/api', imageUpload);
app.use('/api', form);
app.use('/api', eventForm);
app.use('/api', attendEvent);
app.use('/api', petApi);
app.use('/api', users);


// server serves index.html for all routes
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});

io.sockets.on('connection',function(socket){
    console.log("Connected: ", socket.id);

    socket.on('chatlist',(payload)=>{
        console.log(payload);
        console.log("received");
        this.emit('chatlist', payload);
    })
});

//set and run the port and server
app.set('port', process.env.PORT || 8080);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
