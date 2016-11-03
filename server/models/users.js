var db = require('../db/index.js');
//models interact with the database

              // CHANGE THIS ALL TO KNEX!!! PLEASE!

module.exports = {
  users: {
    //the callback that will be passed in is a function that throws an error if there is an error
    // or sends the results of the query as a json object
    get: function(callback) {
      //fill in ____ to make the query, included from, on and order by as an example
      var queryStr = 'select ______, \
                      from users ____ on (_____) \
                      order by ____ desc';
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    //look in db/index.js to see how the usertable is constructed
    //id is ? because it is autoincremented
    post: function(params, callback) {
      var post  = {id: 1, title: 'Hello MySQL'};
      var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      });
      //UPDATE THIS
      var queryStr = 'insert into users(?, userid, userName, faveFood) \
                      value ?,' + params;
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  }
}
