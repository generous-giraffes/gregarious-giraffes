var db = require('../db/index.js');

module.exports = {
  users: {
    get: function (callback) {
      // get all users: name, interests, , id
      var queryStr = 'select ______, \
                      from users ____ on (_____) \
                      order by ____ desc';
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      // create a user
      var queryStr = 'insert into users(_____) \
                      value (_____)';
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },
}
