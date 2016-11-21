'use strict';

var db = require('../db');

module.exports = {

  fetch10: () => db('users').select('*').limit(10),

  addComment: (data) => {
    return db('imageComment').insert({
      comment: data.comment,
      image_id: data.imageId,
      userImageId: data.user_image_id,
      commenter_name: data.userName
    })
  },

  getImages: () => {
    return db('images')
        .join('users as u', 'u.id', '=', 'images.user_image_id')
        .leftOuterJoin('imageComment as ic', 'ic.image_id', 'images.id')
        .select('u.name', 'images.image', 'images.caption', 'images.id', 'images.user_image_id', 'ic.comment', 'ic.commenter_name')
  },

  getBirthdays: (month) => db('users').select('*').where('dob', 'like', `%-${month}-%`)
};
