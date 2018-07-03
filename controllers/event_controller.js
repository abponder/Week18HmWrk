console.log("04.1 the event controller is loading!!!");

const db = require('../models');

// module.exports.index = serveEvents;


exports.index = function(req, res) {
        
        db.Event.findAll({
        }).then(function(dbEvent) {
                console.log('dbTrip says: ', dbEvent);
                 res.render('event', {layout: 'main_events', event: dbEvent});
        });
}

//==================END of View all events ==========================




//update the event
exports.eventUpdate = function (req, res) {
        db.Event.findAll({
                where: {
                        id: req.event.Id,
                        eventName: req.event
                      }
        })

        console.log(db.Event);
        // Add id from User onto req.body
        // req.body.UserId = req.user.id;

        // db.Event.create(req.body).then(function (dbPost) {
        //         res.json(dbPost);
        //         res.render('success', {layout: 'main_events'});
        // });
/////////////////        
}
//==================END of update event ==========================







//add new event
exports.create = function (req, res) {
        console.log(req.user);
        // Add id from User onto req.body
        req.body.UserId = req.user.id;

        db.Event.create(req.body).then(function (dbPost) {
                res.json(dbPost);
                res.render('success', {layout: 'main_events'});
        });
/////////////////        
}


//==================END of add a new event ==========================

