"use strict";

var db = require('../db');

module.exports = {

  update: (data) => {
    return db('users')
  	  .update({
  			dob: data.dob,
  			bloodType: data.bloodType,
  			season: data.season,
  			trained: data.trained,
  			hobbies: data.hobbies,
  			species: data.species,
  			quote: data.quote
  		})
  		.where('email', data.email)
        .then(() => db.select('*').from('users').where('email', data.email))
  },

  fetch: () => db('users').where({userId: data.email}).select('*')
};
