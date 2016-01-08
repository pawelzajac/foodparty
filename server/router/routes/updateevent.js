var express = require('express');
var router = express.Router();
var db = require('../../database');
var Events = db.events;

router.post('/', function (req, res) {

    var body = req.body;

    var updatedEvent = {
        place: body.place,
        desc: body.desc,
        fee: body.fee,
        date: body.date,
        rating: body.rating,
        max: body.max,
        min: body.min,
        creator: body.creator,
        participants: body.participants,
        comments: body.comments
    }

    Events.findOneAndUpdate({"_id":req.body._id}, updatedEvent, {}, function (err, event) {

        if (err) {

            console.log('Couldn\'t update event because of: ' + err);

            res.status(400).json({
                'message': err
            });
        } else {

            res.status(200).json(event);
     
        }

    });

});

module.exports = router;