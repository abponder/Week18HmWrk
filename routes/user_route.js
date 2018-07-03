console.log('03.2 userRoute is loaded!!!');
       
       
        const express = require('express');
        const router  = express.Router();

        const userController = require('../controllers/users_controller');
        router.get('/', userController.login);

        module.exports = router;