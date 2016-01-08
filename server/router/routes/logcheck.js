var express = require('express');
var router = express.Router();
var db = require('../../database');

router.post('/', function (req, res) {

    var body = req.body;

    if(req.session.userId == body.userId) {
        res.status(201).json({});
    } else {
        console.log('Couldn\'t find session for this user');

        res.status(400).json({
            'message': 'Session not found'
        });
    }

});

module.exports = router;