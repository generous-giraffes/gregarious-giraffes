//when this file is required, knex sets up a connection with the databse and creates the tables if they do not exist

//++++++++FOR LOCAL TESTING++++++++
//var knex = require('knex')({
//  client: 'mysql',
//  connection: {
//    //do not push these to git
//    host: 'west2-mysql-giraffes.cdt7ljmioe25.us-west-2.rds.amazonaws.com',
//    port: '3306',
//    //host: 'localhost',
//    user: 'root',
//    password: '',//your local password for root user
//    database: 'users'
//  }
//});

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'giraffe.cdt7ljmioe25.us-west-2.rds.amazonaws.com',
    user: 'giraffes',
    password: 'giraffes',
    port: '3306',
    database: 'giraffes',
    debug: true
  },
  pool: {min: 0, max: 10}
});


//create users table
knex.schema.hasTable('users').then((exists) => {
  console.log(exists)
  if(!exists) {
    return knex.schema.createTable('users', (table) => {
      //from and for authentication
      table.string('name', 40).notNullable()
      table.string('email', 40).notNullable().unique()
      table.text('password').notNullable()
      table.increments('id').primary()
      //from survey form
      table.string('location', 255)
      table.string('dob', 20).defaultTo('null')
      table.string('bloodType', 20).defaultTo('null')
      table.string('season', 30).defaultTo('null')
      table.string('trained', 30).defaultTo('null')
      table.text('hobbies').defaultTo('null')
      table.string('species', 100).defaultTo('null')
      table.text('quote').defaultTo('null')
      table.text('image').defaultTo('null')

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
      table.integer('user1_id')
      table.integer('user2_id')
      table.foreign('user1_id').references('id').inTable('users')
      table.foreign('user2_id').references('id').inTable('users')

      console.log('FRIENDS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})

module.exports = knex;
