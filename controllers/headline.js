const db = require("../models/Headline");

module.export = {
    get:function(req, res){
        db.Headline.find({})
        .then(function(dbHeadline) {
          // If we were able to successfully find Headlines, send them back to the client
          res.json(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    },
    getOne:function(req, res){
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
    },
    post:function(req, res){
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
    }
}

