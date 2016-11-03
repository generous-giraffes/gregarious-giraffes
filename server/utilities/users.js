var knex = require('../db')

var Utils = {

  addUser: (data) => {
    return knex('users').insert(data)
  },

  getAllUsers: function() {
    return knex.select('*').from('users')
  },

  updateFavFoodById: function(id, data) {
    return knex('users').where({id: id})
    .update({
      favoriteFood: data.favoriteFood,
    })
    // .update({ ...data })
  },

  deleteById: function(id) {
    return knex('users').where({id: id}).del()
  }
}

module.exports = Utils;
