const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
const gamesSchema = new Schema({
  title: String,
  categoryName: String,
  editor: String,
  release_date: Date,
  developer: String,
  genre: String,
  picture: String,
});

function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  const db = mongoose.connection;
  return (db);
}

exports.deleteGame = async function (req) {
  try {
    const gameId = req.params.id;
    if (gameId) {
      const db = db_connect();
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const collection = db.collection('games');
        const docs = collection.deleteOne({_id: ObjectId(gameId)}, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            console.log(docs);
          }
        })
      })
    }
  } catch (e) {
    throw Error(e);
  }
};

exports.addGame = async function (req, res) {
  try {
    const game = req.body.gamesForm;
    let arrayErrors = [];
    let arraySuccess = [];

    if (game !== "") {
      const db = db_connect();
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const collection = db.collection('games');
        const gameToSeek = game.gameSelection;
        const categoryToSeek = game.gameCategorySelection;
        gameToSeek.forEach(game => {
          const docs = collection.find({title: game.title}).toArray(function (err, doc) {
            if (doc.length >= 1) {
              arrayErrors.push('Game ' + game.title + ' already exists in our database.');
            } else {
              console.log(docs);
              const Games = mongoose.model('games', gamesSchema);
              const newGame = new Games({
                title: game.title,
                categoryName: categoryToSeek[0].categoryName
              });
              newGame.save(function (err) {
                if (err)
                  console.log(err);
                else {
                  arraySuccess.push('Game ' + game.title + ' saved');
                }
              })
            }
          })
        });
        if (arrayErrors.length > 0 && arraySuccess.length > 0) {
          return (res.status(201).json({
            status: 201,
            message: 'Games partially saved.',
            errors: arrayErrors,
            success: arraySuccess
          }))
        } else if (arrayErrors.length > 0 && arraySuccess.length === 0) {
          return (res.status(504).json({
            status: 504,
            message: 'No games were saved.',
            errors: arrayErrors
          }))
        } else {
          return (res.status(200).json({
            status: 200,
            message: 'All games were saved',
            success: arraySuccess
          }))
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
      let docs = collection.find({}).toArray(function (err, doc) {
        if (doc.length >= 1) {
          console.log(docs);
          return (res.status(200).json({
            status: 200,
            games: doc,
            message: 'Everything went well.'
          }))
        } else {
          return (res.status(201).json({
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
