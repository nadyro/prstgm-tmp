var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth.controller');
var teamsController = require('../../controllers/teams.controller');
var ladderController = require('../../controllers/ladder.controller');
var findController = require('../../controllers/find.controller');
var chatController = require('../../controllers/chat.controller');
var profileController = require('../../controllers/profile.controller');
var DbGamesAdminController = require('../../database/admin/controllers/gamesdb.controller');
var DbUserController = require('../../database/controllers/users/userdb.controller');
var DbGamesController = require('../../database/controllers/games/gamesdb.controller');

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

//PROFILE ROUTES
//POST
router.post('/profile/getSummoner', profileController.getSummoner);
//DB ROUTES
router.post('/db/saveUser', DbUserController.saveUser);
router.post('/db/getUserByEmail', DbUserController.getUserByEmail);
router.post('/db/connect', DbUserController.connect);
router.get('/db/getUsers', DbUserController.getUsers);
router.get('/db/getGames', DbGamesController.getGames);

// DB ADMIN ROUTES
router.get('/db/admin/getGames', DbGamesAdminController.getGames);
router.get('/db/admin/getCategories', DbGamesAdminController.getCategories);
router.post('/db/admin/addGame', DbGamesAdminController.addGame);
router.delete('/db/admin/deleteGame/:id', DbGamesAdminController.deleteGame);

module.exports = router;
