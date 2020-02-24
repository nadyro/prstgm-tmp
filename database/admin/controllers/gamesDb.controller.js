const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const gamesSchema = new Schema({
  title: String,
  categoryName: String,
  editor: String,
  releaseDate: Date,
  developer: String,
  picture: String,
});


function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  const db = mongoose.connection;
  return (db);
}

exports.returnErrors = async function (res, arraySuccess, arrayErrors, verb) {
  let message = '';
  let status = 0;
  if (arrayErrors.length > 0 && arraySuccess.length > 0) {
    status = 201;
    message = 'Elements partially ' + verb + '.';
    return (res.send({
      errorList: arrayErrors,
      successList: arraySuccess,
      message: message,
      status: status
    }));
  } else if (arrayErrors.length > 0 && arraySuccess.length === 0) {
    status = 500;
    message = 'No elements were ' + verb + '.';
    return (res.send({
      errorList: arrayErrors,
      message: message,
      status: status
    }));
  } else {
    status = 200;
    message = 'All elements were ' + verb + '.';
    return (res.send({
      successList: arraySuccess,
      message: message,
      status: status
    }))
  }
}

exports.addGame = async function (req, res) {
  try {
    const game = req.body.gamesForm;
    if (game !== "") {
      const db = db_connect();
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const gameToSeek = game.selection;
        const categoryToSeek = game.categorySelection;

        if (gameToSeek) {
          const Games = mongoose.model('games', gamesSchema);
          const newGame = new Games({
            title: gameToSeek[0].title,
            categoryName: categoryToSeek
          });
          newGame.save(function (err) {
            if (err) {
              console.error(err);
            } else {
              module.exports.getGames(req, res);
            }
          })
        }
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

exports.getGames = async function (req, res) {
  try {
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('games');
      let docs;
      if (req.query.id) {
        docs = collection.find({_id: ObjectId(req.query.id)});
      } else {
        docs = collection.find({});
      }
      docs.toArray(function (err, doc) {
        if (err) {
          throw error;
        }
        if (doc.length >= 1) {
          return res.send(doc);
        } else {
          return (res.send({
            status: 201,
            games: [],
            message: 'No games found.'
          }));
        }
      });
    });
  } catch (e) {
    throw Error(e);

  }
};

exports.deleteGame = async function (req, res) {
  try {
    let errorList = [];
    let successList = [];
    const gameId = req.params.id;
    if (gameId) {
      const db = db_connect();
      db.on('error', function (err) {
        throw err;
      });
      db.once('open', function () {
        const collection = db.collection('games');
        const docs = collection.deleteOne({_id: ObjectId(gameId)}, function (err, data) {
          if (err) {
            errorList.push(err);
            module,exports.returnErrors(res, successList, errorList, 'deleted');
          } else {
            successList.push(data);
            module.exports.getGames(req, res);
          }
        })
      })
    }
  } catch (e) {
    throw Error(e);
  }
};
