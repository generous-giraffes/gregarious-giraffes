var models = require('../models');
//this controller interacts with the database
//get and post requests to db using functions defined in models/users
module.exports = {
  users: {
    //
    get: (req, res) => {
      models.users.get(function(err, results) {
        if(err) console.error(err);
        res.json(results);
      });
    },
    post: (req, res) => {
      var params = [req.body.username];
      models.users.post(params, (err, results) => {
        if(err) throw err;
        res.sendStatus(201);
      });

    }
  }
};
