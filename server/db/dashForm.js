"use strict";

var db = require('../db');

module.exports = {

  fetch10: () => {
    return db('users').select('*').limit(10)
  },

  addComment: ({ comment, imageId, user_image_id, userName }) => {
    return db('imageComment').insert({
      comment: comment,
      image_id: imageId,
      userImageId: user_image_id,
      commenter_name: userName
    })
  },

  getImages: () => {
    return db('images')
        .join('users as u', 'u.id', '=', 'images.user_image_id')
        .leftOuterJoin('imageComment as ic', 'ic.image_id', 'images.id')
        .select('u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id', 'ic.comment', 'ic.commenter_name')
  },

  getBirthdays: (month) => {
    return db('users').select('*').where('dob', 'like', `%-${month}-%`)
  }
};
