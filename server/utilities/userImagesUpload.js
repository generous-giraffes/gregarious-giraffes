var Q = require('q');
var knox = require('knox');
var fs = require('fs')

var UserImageUploader = function(options){
  //deffered is used to handle async functions with callbacks (rather than asynch promises)
  //deffered is a deffered object that returns a promise to the caller (ImageUploader() in imageRoutes.js)
  //so the .then() on ImageUploader will not fire until deferred in this file is resolved or rejected
  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');

  // var knoxClient = knox.createClient({
  //   key: '',//use .env for these
  //   secret: '',
  //   bucket: ''
  // });

  var knoxClient = knox.createClient({
     key: 'AKIAJDZGCTJ676WJRFXA',
     secret: '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',
     bucket: 'giraffepawprints',
     region: 'us-west-2'
   });

  // set endpoint and options for the request headers which will be sent with req.end(buf)
  req = knoxClient.put('/photos/' + options.filename, {
   'Content-Length': buf.length,
   'Content-Type': options.filetype,
   'x-amz-acl': 'public-read'
  });

  //on response from the s3 bucket send the url of the saved image to ImageUploader.then() in imageRoutes
  req.on('response', function(res) {
    if (res.statusCode === 200) {
      deferred.resolve({url: req.url, id: options.id, caption: options.caption, type: options.filetype});
    } else
      deferred.reject({error: 'true'});
  });

  //start the requset by sending the file as a buffer to the s3 Bucket
  req.end(buf);
  //return a promise object to ImageUploader() in imageRoutes.js
  return deferred.promise;

}

module.exports = UserImageUploader;
