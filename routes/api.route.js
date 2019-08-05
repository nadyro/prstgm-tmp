var express = require('express');
var router = express.Router();
var prostagmaApi = require('./api/prostagma.route');

router.use('/prostagmaApi', prostagmaApi);
module.exports = router;