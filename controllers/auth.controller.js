var request = require('request-promise');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


exports.authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://prostagma.eu.auth0.com/.well-known/jwks.json"
    }),
  audience: "http://localhost:8081",
    issuer: "https://prostagma.eu.auth0.com/",
    algorithms: ['RS256']
});

exports.connect = async function (req, res) {
    try {
        console.log('test');
        //console.log(req);
        var array = [];
        array[0] = { obj: '1', data: '1234' };
        return array;
    }
    catch (e) {
        throw Error(e);
    }
}
exports.subscribe = async function (req, res) {
    try {
        console.log(req.body);
        var array = [];
        array[0] = { obj: '1', data: '1234' };
        return (array);
    }
    catch (e) {
        throw Error(e);
    }
}
exports.login = async function (req, res) {
    try {
        console.log(req.body);
        var array = [];
        array[0] = { obj: '1', data: '1234' };
        return (array);
    }
    catch (e) {
        throw Error(e);
    }
}
