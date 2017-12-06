(function() {
    
    'use strict';
    // Server setup

    var express = require('express');
    var app = express();
    var morgan = require('morgan');
    var jwt  = require('jsonwebtoken');
    var config = require('./app/config');

    // Secret

    app.set('superSecret', config.secret);
    
    // Mongoose users model

    var mongoose = require('mongoose');
    var user = require('./app/models/User.js')(mongoose);

    // Routers Setup

    var authRouter = express.Router();
    require('./app/routers/authenticate_route.js')(authRouter, user, jwt, app);
    require('./app/middleware/validateToken.js')(authRouter, user, jwt, app);

    var usersRouter = express.Router();
    require('./app/routers/usersRouter.js')(usersRouter, user);


    // Morgan

    app.use(morgan('dev'));

    // Body Parser Setup

    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Prefix route

    app.use('/api', authRouter);
    app.use('/api', usersRouter);


    // Listen Port

    app.listen( process.env.PORT || 8000);
    
}());
