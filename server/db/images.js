"use strict";

var db = require('../db');

module.exports = {

  addProfileImage: ({ email, url }) => {
    return 	db('users').update('image', url).where('email', email)
  },

  getProfileImage: (id) => {
    return db('users').where('id', id).select('image')
  },

  getUserImages: (id) => {
    return db('images').where('user_image_id', id).select('image', 'caption', 'file_type')
  },

  addUserImage: ({ url, caption, id, type }) => {
    return db('images').insert({
      image: url,
      caption: caption,
      user_image_id: id,
      file_type: type
    })
  }
};
