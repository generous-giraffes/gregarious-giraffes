'use strict';

const jwt = require('jwt-simple');
const secrets = require('../utilities/tools');
const user = require('./../db/usersAuth.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    //Login searches the database for a new user compares the token with the salt and either resolves or rejects
    loginUser (req, res) {
        let User = new Promise((resolve, reject) => {
            let email = req.body.user.email;
            let password = req.body.user.password;

            user.find(password, email, (data) => {

                let userInfo = {email: email, password: password};
                let token = jwt.encode(userInfo, secrets.mySalt);

                if (bcrypt.compareSync(password, data[0].password)) {
                    resolve({token: token, data: data});
                }
                else {
                    reject('Login Error: incorrect username or password');
                }
            });
        });
        return User;
    },

    //This creates a promise that adds a new user, takes the password and creates the token,
    // either resolving or checking if it's an existing user account
    addNewUser (req, res) {
        let addNewUser = new Promise((resolve, reject) => {
            console.log('Sign up in authentication: ', req.body.user);

            let email = req.body.user.email;
            let password = bcrypt.hashSync(req.body.user.password, salt);
            let _user = req.body.user.name;
            let userInfo = {email: email, password: password, _user: _user};
            let token = jwt.encode(userInfo, secrets.mySalt);

            user.add(email, password, _user, (data) => {
                if (data) {
                    let resolvedToken = {token: token, data: data};
                    resolve(resolvedToken);
                }
                else {
                    reject('Signup Error: Existing account');
                }
            });
        })

        return addNewUser;
    }
}
