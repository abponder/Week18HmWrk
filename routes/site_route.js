console.log('03.3 siteRoute is loaded!!!');

    const express = require('express');
    const router  = express.Router();
    const siteController = require('../controllers/site_controller');
    
    router.get('/', siteController.index);
    //router.get('/media', siteController.media);
    
    router.get('/artist', siteController.artist);
   // router.post('/signup', siteController.create);

   router.get('/media', siteController.media);
   // router.post('/signup', siteController.create);


  
//=====================================================================
//=========== ADMIN SECTION ===========================================
//======================================================================
router.get('/admin', siteController.admin);

//to add new event page
router.post('/admin/new-event', siteController.newEvent);

//go to update an event page and populate form
router.get('/admin/goto-event/:id', siteController.gotoUpdate);

//update the event
router.put('/admin/update-event', siteController.updateEvent);

   //login page
// router.get('/admin/login', siteController.login);

//logout page
// router.get('/logout', siteController.login);

    module.exports = router;
