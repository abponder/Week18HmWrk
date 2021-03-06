//dependencies
const express        = require('express');
const path           = require('path');
const logger         = require('morgan');
const bodyparser     = require('body-parser');
//const session        = require('express-session'); 
//const passport 			 = require("./config/passport");
//const config				 = require("./config/extra-config");

const mongojs = require("mongojs");
const mongoose = require("mongoose");

// instantiate Express
const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//    Import routes and give the server access to them.
//    var routes = require("./controllers/addFileNameHere.js");
//    const routes = require("./routes/api"); //** */
//    app.use(routes);
//    require('./routes')(app);


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
//Cheerio parses out HTML and helps us find elements
const axios = require("axios");
const cheerio = require("cheerio");

//const scrape = require("./scripts/scrape");
//require("./routes/api/index")(app);

// Makes HTTP request for HTML page
const request = require("request");

// Require all models
const db = require("./models");

//=====================================================

//define port
const PORT = process.env.PORT || 8080;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// Configure middleware
// Use body-parser for handling form submissions
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  //is this line needed?

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'public')));                   //which one?

// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost:27017/week18Populater");
//**mongoose.connect("mongodb://localhost:27017/mongooseScraperWk18HmWrk");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongooseScraperWk18HmWrk";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });


// app.get("/", function(req, res){
//   res.render("home")

// })

// Routes
// A GET route for scraping the nytimes website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request  
  //axios.get("http://www.echojs.com/").then(function(response) {
  axios.get("https://www.nytimes.com/section/opinion/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Headline using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Headline, send a message to the client
    res.send("Scrape Complete");
  });
});

app.get("/clear", function(req, res) {
  db.Headline.remove({})
    .then(function(datax){
      res.send(datax)
      
    })


})




// Route for getting all Headlines from the db
app.get("/headlines", function(req, res) {
  // Grab every document in the Headlines collection
  db.Headline.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Headlines, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting all Headlines from the db
app.get("/", function(req, res) {
  // Grab every document in the Headlines collection
  db.Headline.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Headlines, send them back to the client
      res.render("home", {items:dbHeadline});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Headline by id, populate it with it's note
app.get("/headlines/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbHeadline) {
      // If we were able to successfully find an Headline with the given id, send it back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Headline's associated Note
app.post("/headlines/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Headline with an `_id` equal to `req.params.id`. Update the Headline to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbHeadline) {
      // If we were able to successfully update an Headline, send it back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});

// Start the server
//module.exports = app;
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
