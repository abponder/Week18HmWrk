const db = require('../models');

exports.index = function(req, res) {
        
        db.Artist.findAll({
        }).then(function(dbEvent) {
                console.log('dbArtist says: ', dbArtist);
                 res.render('event', {layout: 'artist_signup', artist: dbArtist});
        });
}

