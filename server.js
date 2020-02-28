const express = require('express');
const app = express();
const server = require('http').Server(app);
const sockets = require('./sockets/sockets');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const api = require('./routes/api.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', api);
app.use(express.static(__dirname + '/dist/prostagma'));
server.listen(8081, function (request, response) {
  console.log('server is running');
});
sockets(server, '');
module.exports = app;
