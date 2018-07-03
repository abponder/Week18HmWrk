        const express = require('express');
        const router  = express.Router();
        const passport  = require('passport');
        const artistController = require('../controllers/artist_controller');
        const isAuthenticated = require("../config/middleware/isAuthenticated");

        // router.route('/').get(function(req, res) {
        //         console.log('i woork +++++=====>');
        // });

        // router.route('/').get(artistController.index);
        router.get('/', artistController.index);


        //router.post('/update', isAuthenticated, artistController.artistUpdate);
        //router.post('/update', eventController.artistUpdate);

        //router.post('/new', isAuthenticated, artistController.create);
        
        module.exports = router;