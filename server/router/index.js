/**
 * The Index of Routes
 */

module.exports = function (app) {

    app.use('/login', require('./routes/login'));
    app.use('/register', require('./routes/register'));
    app.use('/logcheck', require('./routes/logcheck'));
    app.use('/logout', require('./routes/logout'));
    app.use('/getevents', require('./routes/getevents'));
    app.use('/makeevent', require('./routes/makeevent'));
    app.use('/getevent', require('./routes/getevent'));
    app.use('/updateevent', require('./routes/updateevent'));
    app.use('/removeevent', require('./routes/removeevent'));
}