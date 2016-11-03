var knex = require('../db')
//functions to interact with the database related to users
var Utils = {

  addUser: (data) => {
    return knex('users').insert(data)
  },

  getAllUsers: () => {
    return knex.select('*').from('users')
  },

  updateFavFoodById: (id, data) => {
    return knex('users').where({id: id})
      .update({
        favoriteFood: data.favoriteFood,
      })
    // .update({ ...data })
  },

  deleteById: (id) => {
    return knex('users').where({id: id}).del()
  },

  addFriend: (data) => {
    return knex('friends').insert(data)
  }
}

module.exports = Utils;
