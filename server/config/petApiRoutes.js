const express = require('express');
const router = express.Router();
var request = require('request');

router.post('/pets', (req, res) => {
  //look up different methods than pet.getRandom
  // methods: https://www.petfinder.com/developers/api-docs#methods
  // var reqUrl = 'http://api.petfinder.com/pet.getRandom'

  //for some reason the GET request did not work when the optional parameters were set up in options, rather than attached to the url on line 11
  // let reqUrl = 'http://api.petfinder.com/pet.getRandom?format=json&key=' + process.env.petFinderKey + '&output=basic&animal=dog&location=10012';
  const reqUrl = 'http://api.petfinder.com/pet.getRandom?format=json&key=b9c347eeb65b532a17e0488aa46e77df&output=basic&animal=dog&location=10012';
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
  request(options, (error, response, body) => {
    if(error) throw new Error(error);
    res.send(body);
  })
})

// router.get('/pets/news', (req, res) => {
//   // for more options on the NYT articles endpoint see: https://developer.nytimes.com/article_search_v2.json
//   var reqUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
//     + 'api-key=e7e73dafa9814b9fb3801b53473b59a6'
//     + 'q=pets'
//     + 'srot=newset';
//     ////need to add & or ?
//
//   var options = {
//     'method': 'GET',
//     'url': reqUrl,
//   };
//   request(options, (error, response, body) => {
//     if (error) throw new Error(error);
//     res.send(body);
//   })
// })
router.get('/pets/news', (req, res) => {
request.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
    'api-key': "e7e73dafa9814b9fb3801b53473b59a6",
    'q': "pets",
    'sort': "newest"
  },
}, function(err, response, body) {
  body = JSON.parse(body);
  console.log('one two three', body);
  res.send(body)
})
})


module.exports = router;
