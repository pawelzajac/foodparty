var express = require('express');
var router = express.Router();
var db = require('../../database');
var Events = db.events;

router.post('/', function (req, res) {

    var body = req.body;

    Events.findByIdAndRemove(req.body._id, function (err, event) {

        if (err) {

            console.log('Couldn\'t remove event because of: ' + err);

            res.status(400).json({
                'message': err
            });
        } else {

            res.status(200).json(event);
     
        }

    });

});

module.exports = router;