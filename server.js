// Server setup

var express    = require('express');
var app        = express();

// Router Setup

var router     = express.Router();
require('./app/router.js')(router);

// Body Parser Setup

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Prefix route

app.use('/api', router);

// Listen Port

app.listen( process.env.PORT || 8000);
