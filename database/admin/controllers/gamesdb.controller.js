var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var gamesSchema = new Schema({
    title: String,
    editor: String,
    release_date: Date,
    developer: String,
    genre: String,
    picture: String,
});
function db_connect() {
    mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
    var db = mongoose.connection;
    return (db);
}
exports.deleteGame = async function (req, res) {
    try {
        console.log(req.body);
        console.log("PARAMS");
        console.log(req.params);
        var game_id = req.params.id;
        if (game_id) {
            console.log("test");
            var db = db_connect();
            db.on('error', function (err) {
                console.error(err);
            });
            db.once('open', function (success) {
                var collection = db.collection('games');
                var docs = collection.deleteOne({ _id: ObjectId(game_id) }, function (err, data) {
                    if (err)
                        console.log(err);
                    else
                        console.log(data);
                })
            })
        }
    }
    catch (e) {
        throw Error(e);
    }
}

exports.addGame = async function (req, res) {
    try {
        console.log(req.body.game_name);
        console.log(req.body);
        var game = req.body.game_name;
        console.log(game);
        if (game !== "") {
            var db = db_connect();
            db.on('error', function (err) {
                console.error(err);
            });
            db.once('open', function (success) {
                var collection = db.collection('games');
                var game_to_seek = game;
                var docs = collection.find({ title: game_to_seek }).toArray(function (err, docs) {
                    if (docs.length >= 1) {
                        console.log(docs);
                        return (res.status(202).json({
                            status: 202,
                            message: 'Game already exists in our database.'
                        }))
                    }
                    else {
                        var Games = mongoose.model('games', gamesSchema);
                        var newGame = new Games({
                            title: game
                        })
                        newGame.save(function (err, data) {
                            if (err)
                                console.log(err);
                            else {
                                return (res.status(200).json({
                                    status: 200,
                                    message: 'Game saved.'
                                }))
                            }
                        })
                    }
                })
            })
        }

    }
    catch (e) {
        throw Error(e);
    }
}
exports.getGames = async function (req, res) {
    try {
        var research = req.body.research;
        if (research !== "") {
            var db = db_connect();
            db.on('error', function (err) {
                console.error(err);
            });
            db.once('open', function (success) {
                var collection = db.collection('games');
                var regEx = new RegExp(research, 'i');
                var docs = collection.find({ title: regEx }).toArray(function (err, docs) {
                    if (docs.length >= 1) {
                        console.log(docs);
                        return (res.status(200).json({
                            status: 200,
                            games: docs,
                            message: 'Everything went well.'
                        }))
                    }
                    // else if (docs.length < 1) {
                    //     var Games = mongoose.model('games', gamesSchema);
                    //     var newGame = new Games({
                    //         title: 'Dagestan'
                    //     })
                    //     newGame.save(function (err, data) {
                    //         if (err)
                    //             console.log(err);
                    //         else {
                    //             console.log(data);
                    //         }
                    //     })
                    //     console.log("Table doesn't exist but was created.");
                    //     return (res.status(200).json({
                    //         status: 200,
                    //         message: "Table doesn't exist but was created."
                    //     }));
                    // }
                    else {
                        return (res.status(201).json({
                            status: 201,
                            games: [],
                            message: 'No games found.'
                        }));
                    }
                });
            });
        }
    }
    catch (e) {
        throw Error(e);

    }
}