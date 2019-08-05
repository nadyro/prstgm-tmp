const express = require('express');
const app = express();

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


var http = require('http').createServer(app);
var api = require('./routes/api.route');
var path = require('path');
var createError = require('http-errors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', api);
http.listen(3001, function(request, response) {
    console.log('server is running');
});

module.exports = app;