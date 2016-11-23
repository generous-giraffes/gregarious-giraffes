'use strict';

const auth = require('../config/auth');
const db = require('./index');

module.exports = {
  //find user for signin, used in server/config/auth.js
  find(password, email, callback) {
    db('users').where({email:email}).select('*')
      .then((res) => callback(res))
      .catch((err) => console.log(err))
  },

  //add users to the database with their email, password and name
  add(email, password, name, callback) {
    db('users').insert({
      email: email,
      password: password,
      name: name
    })
    .then(() => {
      return db('users')
          .select('email', 'password', 'name', 'id')
          .where('email', email)
    })
    .then((res) => {
          let userInfo = res[0];
          console.log('USER ADDED, users.js 26', userInfo);
          callback(userInfo);
    })
    .catch((err) => {
      console.log('ERROR ADDING USER, users.js 32', err);
    })
  }
};
