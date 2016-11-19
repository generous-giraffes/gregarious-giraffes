var Q = require('q');
var knox = require('knox');
var fs = require('fs')

var UserImageUploader = function(options){
  //deffered is used to handle async functions with callbacks (rather than asynch promises)
  //deffered is a deffered object that returns a promise to the caller (ImageUploader() in imageRoutes.js)
  //so the .then() on ImageUploader will not fire until deferred is resolved or rejected
  var deferred = Q.defer();
  var buf =  Buffer.from(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  // var blob = new Blob([buf], { type: 'video/mp4' });
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


  // endpoint and options for the request headers to the s3 bucket, sent with req.end(buf)
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
  return deferred.promise;


  // if(options.filetype === 'video/mp4') {
  //   console.log(options,'hey there');
  //   fs.stat(options.file, function(err, stat){
  //     // Be sure to handle `err`.
  //
  //     var req = knoxClient.put(options.file, {
  //         'Content-Length': stat.size
  //       , 'Content-Type': 'text/plain'
  //     });
  //
  //     fs.createReadStream(options.file).pipe(req);
  //
  //     req.on('response', function(res){
  //       if (res.statusCode === 200) {
  //         deferred.resolve({url: req.url, id: options.id, caption: options.caption, type: options.filetype});
  //       } else
  //         deferred.reject({error: 'true'});
  //   });
  //  });
  // }
}

module.exports = UserImageUploader;
