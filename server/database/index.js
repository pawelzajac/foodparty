/**
 * Our Database Interface
 */
var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var EventModel = require('./schemas/event');

// Connections
var developmentDb = 'mongodb://localhost/mydb';
var usedDb;

// set our database to the development one
usedDb = developmentDb;
// connect to it via mongoose
mongoose.connect(usedDb);

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));

// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at ' + usedDb);
});

exports.users = UserModel;
exports.events = EventModel;