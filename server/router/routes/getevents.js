var express = require('express');
var router = express.Router();
var db = require('../../database');
var Events = db.events;

router.post('/', function (req, res) {

    var body = req.body;

    var query = {};

    if(body.dateFrom && body.dateTo){
        query.date = {$gt: body.dateFrom,$lt: body.dateTo};
    } else if(body.dateFrom) {
        query.date = {$gt: body.dateFrom};
    } else if(body.dateTo) {
        query.date = {$lt: body.dateTo};
    }

    if(body.place){
        query.place = {$regex: body.place};
    }

    if(body.user){
        query = {
            'creator.email': body.user.email
        }
    }

    if(body.participant){
        query = {
            'participants.email': body.participant.email
        }
    }

    Events.find(query, function (err, events) {

        if (err) {

            console.log('Couldn\'t find events because of: ' + err);

            res.status(400).json({
                'message': err
            });
        } else {

            res.status(200).json(events);
     
        }

    });

});

module.exports = router;