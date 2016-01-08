var express = require('express');
var router = express.Router();
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;
var Sessions = db.sessions;

router.post('/', function (req, res) {

    var body = req.body;

    Users.create({
        email: body.email,
        name: body.name,
        password: body.password
    }, function (err, user) {

        if (err || !user) {

            console.log('Couldn\'t create user with email: ' + color.red(body.email) + ' because of: ' + err);

            res.status(400).json({
                'message': err
            });
        }

        if (user) {
            res.status(200).json(user);
            
        }

    });

});

module.exports = router;