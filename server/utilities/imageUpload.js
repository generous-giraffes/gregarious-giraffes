var Q = require('q');
var knox = require('knox');
// var aws = require('aws-sdk')

var ImageUploader = function(options){
  console.log('in IMAGE UPLOADER IN UTILITIES, options:', options.filename
,options.filetype);
  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');


      // aws.config.update({accessKeyId: '1034-8749-3937', secretAccessKey: 'AKIAJIOJFJHTZTEFZLIQ'});
      // const optionsS3 = {
      //     accessKeyId: '1034-8749-3937', //aws id
      //     secretAccessKey: 'AKIAJIOJFJHTZTEFZLIQ', //aws secret key
      //     // bucket: 'giraffepawprints', //bucket name
      //     // region: 'website-us-west-2',
      //     endpoint: 'https://giraffepawprints.s3-website-us-west-2.amazonaws.com'
      // }
      // var s3 = new aws.S3(optionsS3)
      // console.log(s3, 's3 +++++++++++++');
      // var options = {
      //  Bucket: 'giraffepawprints',
      //  Key: options.filename,
      // //  Expires: 60,
      //  ContentType: options.filetype,
      //  ACL: 'public-read',
      //  Body: buf
      // }
      // s3.putObject(options, (err, data)=> {
      //   console.log('IN PUT OBJECT CALLBACK');
      //   deferred.resolve(data)
      //   if (err) {console.log(err, err.stack, 'ERROR RETURN PUT OBJECT+++++')}
      //   else {console.log('putOBject return+++++++++',data);}
      // })

    //   s3.getSignedUrl('putObject', options, function(err, data){
    //   if(err) return res.send('Error with S3')
    //
    //   res.json({
    //     signed_request: data,
    //     url: 'https://s3.amazonaws.com/' + 'giraffepawprints' + '/' + options.filename
    //   })
    // })

  knoxClient = knox.createClient({
    key: '',//use .env for these
    secret: '',
    bucket: ''
    // ,
    // endpoint: 's3-website-us-west-2.amazonaws.com'
  });
  // put to a path in our bucket, and make readable by the public
  req = knoxClient.put('/images/' + options.filename, {
   'Content-Length': buf.length,
   'Content-Type': options.filetype,
  //  'Body': options.data_uri,
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
