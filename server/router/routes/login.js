var express = require('express');
var router = express.Router();
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

router.post('/', function (req, res) {

    var body = req.body;

    Users.findOne({

        'email': body.email

    }, function (err, user) {

        if (err || !user) {

            console.log('Couldn\'t find user with email: ' + color.red(body.email) + ' because of: ' + err);

            res.status(400).json({
                'message': 'Wrong email!'
            });
        }

        if (user) {
            if(user.password == body.password) {

                req.session.userId = user._id;

                res.status(200).json(user);
            } else {
                res.status(400).json({
                    'message': "Wrong password!"
                });
            }
            
        }

    });

});

module.exports = router;