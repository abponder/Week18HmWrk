console.log('04.3 the user controller is loadded!!!');

    const passport  = require('passport');
    const isAuthenticated = require("../config/middleware/isAuthenticated");

    module.exports ={
        login: function(req, res) {
            res.render('index');
        }
    }

    //login the user
    
    //logout user
    exports.signOutUser = function(req,res) {
        req.logout();
        res.redirect("/");
      };