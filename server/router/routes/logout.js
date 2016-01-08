var express = require('express');
var router = express.Router();
var db = require('../../database');

router.post('/', function (req, res) {

    var body = req.body;

    req.session.userId = null;

            res.status(200).json({});

});

module.exports = router;