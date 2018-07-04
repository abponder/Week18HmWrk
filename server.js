//dependencies
const express = require('express');
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require("mongoose");
// Parses our HTML and helps us find elements
const cheerio = require('cheerio')
// Makes HTTP request for HTML page
var request = require("request");
const db = require('./models');
//=====================================================

//initialize the server
const app = express();

//define port
const PORT = process.env.PORT || 8080;

//define logger
app.use(logger('dev'));

//define data parsing
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//define public folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/skyScraperdb";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


//define routing
require('./routes')(app);

//================================================================
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    })
});
//================================================================

module.exports = app; 

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});