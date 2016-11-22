"use strict";

var db = require('../db');

module.exports = {

  get10: (offset) => db('users').select('*').offset(offset).limit(10),

  count: () => db('users').count('name'),

  findId: (friendEmail) => db('users').select('id').where('email', friendEmail).then((data) => data[0].id),

  addFriend: (id, friendId) => {
    //if the users are already friends return an error else add the friendhip to the friends table
    return db('friends').count('user2_id').where({'user2_id': friendId,'user1_id': id})
      .then((count) => {
        let alreadyFriends = Boolean(count[0]['count(`user2_id`)']);
        if(alreadyFriends) {
          return {error:true}
        } else {
          return db('friends').insert({
            user1_id: id,
            user2_id: friendId
          });
        }
      })
  },

  getFriend: (friendId) => db('users').select('*').where('id', friendId),

  removeFriend: (friendId, userId) => db('friends')
    .where({
      'user1_id': userId,
      'user2_id': friendId
    })
    .del(),

  getFriends: (id) => {
    return db('users').select('*')
      .leftOuterJoin('friends', 'users.id', 'friends.user2_id')
      .where('friends.user1_id', id)
  },

  getFriendPhotos: (id) => db('images').select('*').where('user_image_id', id),

  getFriendEvents: (id) => {
    return db('users as u')
      .join('attendingEvents as aE', 'u.id', '=', 'aE.user_id')
      .join('events as e', 'e.id', '=', 'aE.event_id')
      .where('u.id', id)
      .distinct('user_id', 'event_id')
      .select('e.name', 'e.location', 'e.date', 'e.time', 'e.gifts', 'e.animals', 'e.eating', 'e.danger', 'e.address', 'e.coordinates');
  },

  search: (name) => db('users').select('*').where('name', 'like', `%${name}%`)
};
