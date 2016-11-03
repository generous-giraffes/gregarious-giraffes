-- for testing purposes, can run this in a terminal (once you have mysql installed):
-- from the root of this project directory on the command line run:  mysql -u root -p < server/schema.sql
    -- if that did not work, try: mysqladmin -u root password     to set up a password for the root user
-- then run: mysqladmin -u roor -p. this shoul take you to the mySQL monitor
-- run:  use users;          to use the users databse
-- run: describe users;      to see the table
--run: select * from users;  to display everything in the table
-- go to https://dev.mysql.com/doc/refman/5.7/en/select.html for more select options

CREATE DATABASE users;

USE users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userid int NOT NULL,
  userName varchar(50) NOT NULL,
  faveFood varchar(100)  NOT NULL,
  PRIMARY KEY (ID)
);
-- other schemas go here
