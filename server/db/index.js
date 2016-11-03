// var mysql = require('mysql');
//
// var connection = mysql.createConnection({
//   user: 'root',
//   password: 'a',
//   database: 'users'//insert db name here
// });
// //calling connection.query creates a conenction inplace of calling connection.connect();
// connection.query('CREATE DB IF IT DOES NOT EXIST', (err) => {
//   if(err) throw err;
//   connection.query('USE users', (err) => {
//     if(err) throw err;
//     connection.query('CREATE TABLE IF NOT EXISTS users('
//       + 'id INT NOT NULL AUTO_INCREMENT,'
//       + 'userid int NOT NULL,'
//       + 'userName VARCHAR(50) NOT NULL,'
//       + 'faveFood varchar(100) NOT NULL,'
//       + 'PRIMARY KEY(id),'
//       +  ')', (err) => {
//         if(err) throw err;
//     });
//   });
// });
//
// module.exports = connection;

//when this file is required, knex sets up a connection with the databse and creates the tables if they do not exist

//put these in another file, do not push to git
//client and connection options (config object) passed into knex module to create connection to db
var knex = require('knex')({
  client: 'mysql',
  connection: {
    //do not push these to git
    host: 'https://localhost:3000',
    user: 'root',
    password: 'a',
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
      table.string('name', 40)
      table.text('favoriteFood', 40)

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
