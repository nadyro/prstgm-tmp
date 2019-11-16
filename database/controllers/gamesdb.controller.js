var mongoose = require('mongoose');

function db_connect() {
    mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
    var db = mongoose.connection;
    return (db);
}

exports.getGames = async function (req, res) {
    try {
        var db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
        db.once('open', function (success) {
            var collection = db.collection('games');
            var docs = collection.find({}).toArray(function (err, docs) {
                if (docs) {
                    console.log(docs);
                    return (res.status(200).json({
                        status: 200,
                        games: docs
                    }))
                }
                else {
                    return (res.status(400).json({
                        status: 400,
                        message: 'Something went wrong'
                    }));
                }
            });
        });
    }
    catch (e) {
        throw Error(e);
    }
}