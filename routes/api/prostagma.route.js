const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const teamsController = require('../../controllers/teams.controller');
const ladderController = require('../../controllers/ladder.controller');
const findController = require('../../controllers/find.controller');
const chatController = require('../../controllers/chat.controller');
const profileController = require('../../controllers/profile.controller');
const DbGamesAdminController = require('../../database/admin/controllers/gamesDb.controller');
const DbUserController = require('../../database/controllers/users/userDb.controller');
const DbGamesController = require('../../database/controllers/games/gamesDb.controller');
const DbCategoriesController = require('../../database/admin/controllers/categoriesDb.controller');
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
router.post('/db/getUsersById', DbUserController.getUserById);
router.get('/db/getUsers', DbUserController.getUsers);
router.get('/db/getGames', DbGamesController.getGames);

// DB ADMIN ROUTES
router.get('/db/admin/getGames', DbGamesAdminController.getGames);
router.get('/db/admin/getCategories', DbCategoriesController.getCategories);
router.post('/db/admin/addCategories', DbCategoriesController.addCategories);
router.post('/db/admin/addGame', DbGamesAdminController.addGame);
router.delete('/db/admin/deleteGame/:id', DbGamesAdminController.deleteGame);
router.delete('/db/admin/deleteCategory/:id', DbCategoriesController.deleteCategories);
module.exports = router;
