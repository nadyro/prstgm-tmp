const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

class Game {
  title;
  categoryName;
  editor;
  releaseDate;
  developer;
  picture;
}

class Category {
  categoryName;
  picture;
}

const gamesSchema = new Schema({
  title: String,
  categoryName: String,
  editor: String,
  releaseDate: Date,
  developer: String,
  picture: String,
});
const categoriesSchema = new Schema({
  categoryName: String,
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

function returnErrors(res, arraySuccess, arrayErrors) {
  if (arrayErrors.length > 0 && arraySuccess.length > 0) {
    return (res.status(201).json({
      status: 201,
      message: 'Elements partially saved.',
      errors: arrayErrors,
      success: arraySuccess
    }))
  } else if (arrayErrors.length > 0 && arraySuccess.length === 0) {
    return (res.status(504).json({
      status: 504,
      message: 'No elements were saved.',
      errors: arrayErrors
    }))
  } else {
    return (res.status(200).json({
      status: 200,
      message: 'All elements were saved',
      success: arraySuccess
    }))
  }
}

function addCategories(res, db, categories) {
  try {
    console.log('TM');

    let arrayErrors = [];
    let arraySuccess = [];
    console.log(categories);
    categories.forEach(category => {
      console.log(category);
      let categoryClass = new Category();
      categoryClass.categoryName = category.categoryName;
      if (category.picture) {
        categoryClass.picture = category.picture;
      }
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const collection = db.collection('categories');
        const categoryToSeek = category.categoryName;
        console.log(categoryToSeek);

        const docs = collection.find({categoryName: categoryToSeek}).toArray(function (err, doc) {
          if (doc.length >= 1) {
            let message = 'Category ' + categoryToSeek + 'already exists.';
            arrayErrors.push(message);
          } else {
            console.log('categories')
            const Categories = mongoose.model('categories', categoriesSchema);
            const newCategory = new Categories({
              categoryName: categoryToSeek,
            });
            newCategory.save(function (err) {
              console.log('fdp');
              if (err) {
                arrayErrors.push(err);
              } else {
                let message = 'Category ' + categoryToSeek + 'saved.';
                arraySuccess.push(message);
              }
            })
          }
        });
      });
    });
    console.log(arrayErrors);
    console.log(arraySuccess);

    // return returnErrors(res, arraySuccess, arrayErrors);
  } catch (e) {
    throw Error(e);
  }
}

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
      let categories = addCategories(res, db, game.gameCategorySelection);
      db.once('open', function () {
        const collection = db.collection('games');
        const gameToSeek = game.gameSelection;
        const categoryToSeek = game.gameCategorySelection;

        if (gameToSeek)
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
        returnErrors(res, arraySuccess, arrayErrors);
      });
    }
  } catch (e) {
    throw Error(e);
  }
};

exports.getCategories = async function (req, res) {
  try {
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('categories');
      let docs = collection.find({}).toArray(function (err, doc) {
        if (doc.length >= 1) {
          return (res.status(200).json({
            status: 200,
            categories: doc,
            message: 'Everything went well'
          }))
        } else {
          return (res.status(500).json({
            status: 500,
            message: 'No category found.'
          }))
        }
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
exports.getGames = async function (req, res) {
  try {
    const db = db_connect();
    console.log(req.query);


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
