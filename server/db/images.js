"use strict";

var db = require('../db');

module.exports = {

  addProfileImage: (data) => {
    return 	db('users').update('image', data.url).where('email', data.email)
  },

  getProfileImage: (id) => {
    return db('users').where('id', id).select('image')
  },

  getUserImages: (id) => {
    return db('images').where('user_image_id', id).select('image', 'caption', 'file_type')
  },

  addUserImage: (data) => {
    return db('images').insert({
      image: data.url,
      caption: data.caption,
      user_image_id: data.id,
      file_type: data.type
    })
  }
};
