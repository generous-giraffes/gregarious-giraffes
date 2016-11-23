# gregarious-giraffes
Thesis Project

Roles
- Scrum Master, Sara Sailors
- Product Owner, Jake Smith
- Developers: Laurhens Daudier, Sara Sailors, Jake Smith

How to Run Locally:
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
- sudo apt-get install mysql-server mysql-client
- sudo npm install -g webpack
- ONE TAB
    - mysql -u root -p
    - type in whatever password you used
    - create database giraffes;
    - use giraffes;
- SECOND TAB
    - node server/server.js
    - if you are in a place where you want it to run forever do this --> forever start server/server.js
    - if you need to kill the nodes b/c it says IN USE, run --> killall -9 node
- THIRD TAB
    - webpack
--> public link: ec2-35-161-238-190.us-west-2.compute.amazonaws.com

Some basic MySql commands:
  - show tables;
  - show columns;
  - select name, email from users;
  - select * from users; //the images will distort the table display, it is better to select specific columns
  - select name, email hobbies from users where name='insertName';  //type the ' ' for this one


Things you can do with this app:
- Sign up / log in
- Fill out the profile survey
- Add an image
- Can add additional photos to your profile (which display on the dashboard)
- Dashboard
    - Search for friends
    - Add a friend
    - Comment on images that users add
- Chat
- Events
    - Can create an event
    - Can 'attend' an event
    - When you add an address or location, it uses Google maps to mark the location