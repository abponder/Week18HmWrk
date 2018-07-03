console.log('01. The server.js is loaded!!');

   //dependencies
    const express       = require('express');
    const path          = require('path');
    const bodyparser    = require('body-parser');
    const session       = require('express-session'); 
    const exhbs         = require('express-handlebars');
    const logger        = require('morgan');
    const passport      = require('passport');
    const favicon       = require('serve-favicon');
    const sequelize     = require('sequelize');
    const config        = require('./config/extra-config');
    const db            = require('./models');
//=====================================================

    //start the server
    const app = express();

    //define the port
    const PORT = process.env.PORT || 8080;

    //sessions
    app.use(session({ secret: 'bbaaaarrrrfixxx', cookie: { maxAge: 60000 }}));

    //views
    const views = path.join(__dirname, 'views');
    app.set('views', views);

    //handlebar defaults
    app.engine('handlebars', exhbs({
            defaultLayout: 'main',
            extname: 'handlebars',
            layoutsDir: path.join(__dirname,'views/layouts')
        })
    );
    app.set('view engine', 'handlebars');

    const isAuth    = require('./config/middleware/isAuthenticated');
    const authCheck = require('./config/middleware/attachAuthenticationStatus');

    //view the events as happen in development.
    //*****remove in production *********
    //***********************************
    app.use(logger('dev'));
    //***********************************

    //define data parsing
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());

    //define public folder
    app.use(express.static(path.join(__dirname, 'public')));

    //favicon ============= 
    //********Place the favicon in the public folder and un-comment code below*****
    app.use(favicon(__dirname + '/public/favicon.ico'));

    //passport user authentication ===========================
    app.use(require('express-session')({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
    app.use(require('cookie-parser')());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authCheck);
    //end of passport =========================================
   
    //define routing
    require('./routes')(app);
    

//================================================================
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
    //================================================================

    module.exports = app;
    //==============================================================

    db.sequelize.sync().then(function () {
        console.log('sequelize is working');
      const server = app.listen(PORT, function(){
        console.log('app listening on http://localhost:' + PORT);
      });
    });

