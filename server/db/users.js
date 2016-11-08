'use strict';

const auth = require('../config/auth');
const db = require('./index');

module.exports = {
  find(email, callback) {
    //not sure what you want selected after the users are filtered by email
    db('users').where({email:email}).select('name', 'email', 'password', 'location')
      .then((res) => callback(res))
      .catch((err) => console.log(err))
      //modeled after this:
    // User.find({email: email}, (err, result) => {
    //   if(err) console.error(err);
    //   callback(result);
    // });
    //++++REFACTOR THE REST OF THESE
    db('users').where({userId: 1}).select('image')
      .then((img) =>{
        res.send(img[0].image);
      })
      .catch((err) => {
        console.error(err);
      })
  },
  add(email, password, name, location, callback) {
    let user = new User({
      email: email,
      password: password,
      name: name,
      locaiton: location
    });

    User.count({email: email}, (err, count) => {
      console.log('----| count in User.find DBuser: ', count, ' err: ', err);

      if(count === 0){
        user.save((err, result) => {
          if(err) console.error(err);
          callback(result);
        });
      }
      else {
        callback(false);
      }
    })
  },
  update(id, properties, callback) {
    User.findById(id, (err, result) => {
      if(err) console.error(err);
      if(!result) {
        callback({message: "User with " + id + " not found"});
      }
      result.email = properties[0] || result.email;
      result.password = properties[1] || result.password;
      result.name = properties[2] || result.name;
      result.locaiton = properties[3] || result.location;

      result.save((err) => {
        if(err) throw err;
        callback({
          message: "Successfully updated user",
          data: result
        });
      });
    });
  },
  remove(id, callback) {
    User.findOneAndRemove({_id: id}, (err, result) => {
      if(err) console.error(err);
      callback({
        message: "Successfully deleted user",
        data: result
      });
    });
  }
};
