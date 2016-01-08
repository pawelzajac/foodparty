var express = require('express');
var router = express.Router();
var db = require('../../database');
var Events = db.events;

router.post('/', function (req, res) {

    var body = req.body;

    Events.create({
    	place: body.place,
    	desc: body.desc,
    	fee: body.fee,
        date: body.date,
        rating: 5, 
        max: body.max, 
        min: body.min, 
        creator: body.user,
        comments: [],
        participants: []
    }, function(err, created) {
    	if(err){
    		res.status(500).json({message: err});
    	} else {
    		res.status(200).json({created: created});
    	}
    })

});

module.exports = router;