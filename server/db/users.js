'use strict';

const express = require('express');
const auth = require('../config/auth');

const router = express.Router();

router.route('/', auth.checkUser)
    .post((req, res) => {
        let userData = req.body.user;
        //calls database and saves user profile
    })
    .put((req, res) => {
        let userData = req.body.user.params;
        //calls database and modifies a user profile;
    })
    .delete((req, res) => {
        let userName = req.body.user.username;
        //calls a database function that deletes the specified user
    });

//Need to do something like this for each of them

//    router.find (email, callback) {
//        User.find({email: email}, (err, result) => {
//            if (err) console.error(err);
//            callback(result);
//        });
//    },
//    router.add (email, password, name, location, callback) {
//        let user = new User({
//            email: email,
//            password: password,
//            name: name,
//            locaiton: location
//        });
//
//        User.count({email: email}, (err, count) => {
//            console.log('----| count in User.find DBuser: ', count, ' err: ', err);
//
//            if (count === 0) {
//                user.save((err, result) => {
//                    if (err) console.error(err);
//                    callback(result);
//                });
//            }
//            else {
//                callback(false);
//            }
//        })
//    },
//    router.update (id, properties, callback) {
//        User.findById(id, (err, result) => {
//            if (err) console.error(err);
//            if (!result) {
//                callback({message: "User with " + id + " not found"});
//            }
//            result.email = properties[0] || result.email;
//            result.password = properties[1] || result.password;
//            result.name = properties[2] || result.name;
//            result.locaiton = properties[3] || result.location;
//
//            result.save((err) => {
//                if (err) throw err;
//                callback({
//                    message: "Successfully updated user",
//                    data: result
//                });
//            });
//        });
//    },
//    remove (id, callback) {
//        User.findOneAndRemove({_id: id}, (err, result) => {
//            if (err) console.error(err);
//            callback({
//                message: "Successfully deleted user",
//                data: result
//            });
//        });
//    }
//};

module.exports = router;
