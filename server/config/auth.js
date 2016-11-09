'use strict';

const jwt = require('jwt-simple');
const secret = require('../utilities');
const user = require('./../db/users.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {  //add expires to payload, then check against
    login (req, res) {
        let existingUser = new Promise((resolve, reject) => {
            let _email = req.body.user.email;

            user.find(_email, (data) => {
                console.log('data in user.find in auth: ', data);

                let payload = {email: _email, scope: secret.scope};
                let token = jwt.encode(payload, secret.salt);

                if (bcrypt.compareSync(req.body.user.password, data[0].password)) {
                    resolve({token: token, data: data});
                }
                else {
                    reject('Login Error: incorrect username or password');
                }
            });
        });
        return existingUser;
    },

    checkUser (req, res, next) {
        let _token = req.headers.token;
        let _decoded = jwt.decode(_token, secret.salt);

        if (_decoded.scope === secret.scope) {
            next();
        }
        else {
            console.error('invalid token')
        }
    },

    addUser (req, res) {
        let newUser = new Promise((resolve, reject) => {
            console.log('----| in signup Auth: ', req.body.user);

            let _email = req.body.user.email;
            let _password = bcrypt.hashSync(req.body.user.password, salt);
            let _user = req.body.user.name;
            let _location = req.body.user.location;

            let payload = {email: _email, scope: secret.scope};
            let token = jwt.encode(payload, secret.salt);

            user.add(_email, _password, _user, _location, (data) => {
                if (data) {
                    let resolved = {token: token, data: data};
                    resolve(resolved);
                }
                else {
                    reject('Signup Error: this user already exists');
                }
            });
            return newUser;
        })
    }
}
