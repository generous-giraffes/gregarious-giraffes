var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: 'a',
  database: 'users'//insert db name here
});
//calling connection.query creates a conenction inplace of calling connection.connect();
connection.query('CREATE DB IF IT DOES NOT EXIST', (err) => {
  if(err) throw err;
  connection.query('USE users', (err) => {
    if(err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS users('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'userid int NOT NULL,'
      + 'userName VARCHAR(50) NOT NULL,'
      + 'faveFood varchar(100) NOT NULL,'
      + 'PRIMARY KEY(id),'
      +  ')', (err) => {
        if(err) throw err;
    });
  });
});

module.exports = connection;
