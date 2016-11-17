var Q = require('q');
var knox = require('knox');

var ImageUploader = function(options){
  console.log('in IMAGE UPLOADER IN UTILITIES, options:', options.filename
,options.filetype);
  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');

 knoxClient = knox.createClient({
      key: 'AKIAJDZGCTJ676WJRFXA',
      secret: 'xXQZoL1ePo8ZHVLYX5Wcn7x5Opvqxjah9GaCSenJ',
      bucket: 'giraffepawprints',
      endpoint: 's3-website-us-west-2.amazonaws.com'
    });
  // knoxClient = knox.createClient({
  //   key: '',//use .env for these
  //   secret: '',
  //   bucket: ''
  //   // ,
  //   // endpoint: 's3-website-us-west-2.amazonaws.com'
  // });

  // put to a path in our bucket, and make readable by the public
  req = knoxClient.put('/photos/' + options.filename, {
   'Content-Length': buf.length,
   'Content-Type': options.filetype,
   'x-amz-acl': 'public-read'
  });
  console.log(req, 'req in server');

  req.on('response', function(res) {
    console.log(knoxClient, "knox client in IMAGE UPLOAD");
    if (res.statusCode === 200) {
      console.log('reposne from S2, 200 recieved');
      deferred.resolve(req.url);
    } else
    console.log('reposne from S3, rejected recieved',res.statusCode);
      deferred.reject({error: 'true'});
  });

  req.end(buf);
  return deferred.promise;
}

module.exports = ImageUploader;
