var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth.controller');
var teamsController = require('../../controllers/teams.controller');
var ladderController = require('../../controllers/ladder.controller');
var findController = require('../../controllers/find.controller');
var chatController = require('../../controllers/chat.controller');
var DbUserController = require('../../database/controllers/userdb.controller');
//AUTH ROUTES
// GET
router.get('/connect', authController.connect);
// POST
router.post('/subscribe', authController.subscribe);
router.post('/login', authController.login);
//TEAMS ROUTES
// GET
router.get('/teams', authController.authCheck, teamsController.connect);
router.get('/teams/connect', teamsController.connect);
//LADDER ROUTES
// GET
router.get('/ladder/home', authController.authCheck, ladderController.connect);
//FIND ROUTES
// GET
router.get('/find/home', authController.authCheck, findController.connect);
//CHAT ROUTES
// GET
router.get('/chat/home', authController.authCheck, chatController.connect);

//DB ROUTES
router.post('/db/saveUser', DbUserController.saveUser);
module.exports = router;