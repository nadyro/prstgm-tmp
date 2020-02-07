const mongoose = require('mongoose');

function db_connect() {
    mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
  const db = mongoose.connection;
    return (db);
}

exports.getGames = async function (req, res) {
    try {
      const db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
      db.once('open', function () {
        const collection = db.collection('games');
        const docs = collection.find({}).toArray(function (err, docs) {
                if (docs) {
                    console.log(docs);
                    return (res.send(docs));
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
};
