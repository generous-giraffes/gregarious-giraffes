//when this file is required, knex sets up a connection with the databse and creates the tables if they do not exist

//client and connection options (config object) passed into knex module to create connection to db
//put these in another file, do not push to git
var knex = require('knex')({
  client: 'mysql',
  connection: {
    //do not push these to git
    host: 'west2-mysql-giraffes.cdt7ljmioe25.us-west-2.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: '',
    database: 'users'
  },
  acquireConnectionTimeout: 60000
});
//create users table
knex.schema.hasTable('users').then((exists) => {
  if(!exists) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.integer('userid')
      table.string('username', 40)
      table.string('firstName', 40)
      table.string('lastName', 40)
      table.string('dob', 20)
      table.string('bloodType', 20)
      table.string('season', 30)
      table.string('trained', 30)
      table.text('hobbies')
      table.string('species', 100)
      table.text('quote')
      table.text('image')

      console.log('USERS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})
//create friends table
knex.schema.hasTable('friends').then((exists) => {
  if(!exists) {
    return knex.schema.createTable('friends', (table) => {
      table.foreign('user1_id').references('id').inTable('users');
      table.foreign('user2_id').references('id').inTable('users');

      console.log('FRIENDS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})

module.exports = knex;
