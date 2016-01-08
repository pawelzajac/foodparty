var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    place: { type: String, required: true },
    desc: { type: String, required: true },
    fee: { type: String, required: true },
    date: { type: Number, required: true },
    rating: { type: Number, required: true },
    max: { type: Number, required: true },
    min: { type: Number, required: true },
    creator: { type: Schema.Types.Mixed, required: true },
    comments: { type: Array},
    participants: { type: Array}
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;