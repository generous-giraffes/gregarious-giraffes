"use strict";

var db = require('../db');

module.exports = {

  get10: (offset) => {
    return 	db('users').select('*').offset(offset).limit(10);
  },

  count: () => {
    return db('users').count('name');
  },

  findId: (friendEmail) => {
    return db('users').select('id').where('email', friendEmail)
  },

  addFriend: (id, friendId) => {
    return db('friends').insert({
          user1_id: id,
          user2_id: friendId
         })
  },

  getFriend: (friendId) => {
    return db('users').select('*').where('id', friendId);
  },

  getFriends: (id) => {
    return db('users').select('*')
      .leftOuterJoin('friends', 'users.id', 'friends.user2_id')
      .where('friends.user1_id', id)
  },

  getFriendPhotos: (id) => {
    return db('images').select('*').where('user_image_id', id)
  },

  search: (name) => {
    return db('users').select('*').where('name','like', `%${name}%`)
  }
};
