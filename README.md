# gregarious-giraffes
Thesis Project

Roles
- Scrum Master, Sara Sailors
- Product Owner, Jake Smith
- Developers: Laurhens Daudier, Sara Sailors, Jake Smith

How to Run:
- npm install
- node server/server.js
- webpack - w

How to Deploy with AWS using EC2 / Elastic Beanstalk
- cd ~/.ssh
- cd keypairs
- ssh -i "giraffes.pem" ubuntu@ec2-35-161-238-190.us-west-2.compute.amazonaws.com
- git clone repository (unless you already have)
- cd into repository
- sudo npm install
- node server/server.js
--> public link: ec2-35-161-238-190.us-west-2.compute.amazonaws.com

How to connect to deployed MySQL database instance:
- at command prompt type: mysql -h giraffe.cdt7ljmioe25.us-west-2.rds.amazonaws.com -P 3306 -u giraffes -p
- type the following commands without the ''
- enter 'giraffes'
- you should now be in the mysql command line
- select the database, type: 'use giraffes;'
- some basic commands:
  - show tables;
  - show columns;
  - select name, email from users;
  - select * from users; //the images will distort the table display, it is better to select specific columns
  - select name, email hobbies from users where name='insertName';  //type the ' ' for this one

How to set up a local MySQL database:
- first, make sure you have mysql installed (npm install mysql)
- at the command prompt type:  mysql.server start, then, $ mysql -h localhost -u root -p, and enter a password for the root user, this password will go in server/db/index.js
- when in the mysql terminal type: create database giraffeLocal;, and then type: use giraffeLocal;
- go to index.js in server/db and make sure that the knex library initiation with host: 'localhost' is uncommented, and that the other knex initiation is commented out
- enter your password for your mysql root user in the connection object
