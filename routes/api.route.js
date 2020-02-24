const express = require('express');
const router = express.Router();
const prostagmaApi = require('./api/prostagma.route');

router.use('/prostagmaApi', prostagmaApi);
module.exports = router;
