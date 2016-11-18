//when this file is required, knex sets up a connection with the databse and creates the tables if they do not exist

//++++++++FOR LOCAL TESTING++++++++
//start and setup mysql in termina: $ mysql.server start, then, $ mysql -h localhost -u root -p
//when in the mysql terminal type: create database giraffeLocal;, and then type: use giraffeLocal;


 var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'admin',//your local password for root user
    database: 'giraffeLocal'
  }
 });

 //var knex = require('knex')({
 //    client: 'mysql',
 //    connection: {
 //        host: 'giraffe.cdt7ljmioe25.us-west-2.rds.amazonaws.com',
 //        user: 'giraffes',
 //        password: 'giraffes',
 //        port: '3306',
 //        database: 'giraffes',
 //        debug: true
 //    },
 //    pool: {min: 0, max: 10}
 //});

//create users table
knex.schema.hasTable('users').then((exists) => {
  console.log(exists)
  if(!exists) {
    return knex.schema.createTable('users', (table) => {
      //from and for authentication
      table.string('name', 40).notNullable().defaultTo('jake smith')
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
      table.text('image').defaultTo('null')//update this with s3 bucket reference

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
      table.integer('user1_id').unsigned()
      table.integer('user2_id').unsigned()
      table.foreign('user1_id').references('id').inTable('users')
      table.foreign('user2_id').references('id').inTable('users')

      console.log('FRIENDS TABLE CREATED');
    })
    .catch((error) => {
      throw error;
    })
  }
})

//create events table
knex.schema.hasTable('events').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('events', (table) => {
          table.increments('id').primary()
          table.string('name', 255).defaultTo('null')
          table.string('location', 255).defaultTo('null')
          table.string('date', 30).defaultTo('null')
          table.string('time', 20).defaultTo('null')
          table.string('gifts', 20).defaultTo('null')
          table.text('animals').defaultTo('null')
          table.text('eating').defaultTo('null')
          table.text('danger').defaultTo('null')
          table.string('address', 255).defaultTo('null')
          table.string('coordinates', 255).defaultTo('null')

          console.log('EVENTS TABLE CREATED');
        })
        .catch((error) => {
          throw error;
        })
  }
})

//create event attending table
knex.schema.hasTable('attendingEvents').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('attendingEvents', (table) => {
                table.integer('user_id').unsigned()
                table.integer('event_id').unsigned()
                table.foreign('user_id').references('id').inTable('users')
                table.foreign('event_id').references('id').inTable('events')

                console.log('ATTENDING EVENTS TABLE CREATED');
            })
            .catch((error) => {
                throw error;
            })
    }
})

//create chat table
knex.schema.hasTable('chats').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('chats', (table) => {
          table.increments('id').primary()
          table.string('name', 255).defaultTo('null')
          table.text('comment').defaultTo('null')

          console.log('CHATS TABLE CREATED');
        })
        .catch((error) => {
          throw error;
        })
  }
})

module.exports = knex;
