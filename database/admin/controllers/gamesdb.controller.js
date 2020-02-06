// const gamesSchema = require('../../models/gamesSchema');
const gamess = require("../../controllers/games/gamesdb.controller");
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
const categoriesSchema = new Schema({
  categoryName: String,
  picture: String,
});

function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  const db = mongoose.connection;
  return (db);
}

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
            returnErrors(res, successList, errorList, 'deleted');
          } else {
            successList.push(data);
            gamess.getGames(req, res);
          }
        })
      })
    }
  } catch (e) {
    throw Error(e);
  }
};

function returnErrors(res, arraySuccess, arrayErrors, verb) {
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

//
// function addCategories(res, db, categories) {
//   try {
//     let arrayErrors = [];
//     let arraySuccess = [];
//     console.log(categories);
//     categories.forEach(category => {
//       console.log(category);
//       let categoryClass = new Category();
//       categoryClass.categoryName = category.categoryName;
//       if (category.picture) {
//         categoryClass.picture = category.picture;
//       }
//       db.on('error', function (err) {
//         console.error(err);
//       });
//       db.once('open', function () {
//         const collection = db.collection('categories');
//         const categoryToSeek = category.categoryName;
//         console.log(categoryToSeek);
//
//         const docs = collection.find({categoryName: categoryToSeek}).toArray(function (err, doc) {
//           if (doc.length >= 1) {
//             let message = 'Category ' + categoryToSeek + 'already exists.';
//             arrayErrors.push(message);
//           } else {
//             console.log('categories')
//             const Categories = mongoose.model('categories', categoriesSchema);
//             const newCategory = new Categories({
//               categoryName: categoryToSeek,
//             });
//             newCategory.save(function (err) {
//               console.log('fdp');
//               if (err) {
//                 arrayErrors.push(err);
//               } else {
//                 let message = 'Category ' + categoryToSeek + 'saved.';
//                 arraySuccess.push(message);
//               }
//             })
//           }
//         });
//       });
//     });
//     console.log(arrayErrors);
//     console.log(arraySuccess);
//
//     // return returnErrors(res, arraySuccess, arrayErrors);
//   } catch (e) {
//     throw Error(e);
//   }
// }

exports.addGame = async function (req, res) {
  try {
    let arrayErrors = [];
    let arraySuccess = [];
    let countSuccess = 0;
    const game = req.body.gamesForm;
    console.log(game);
    console.log(req.body.gamesForm);
    if (game !== "") {
      const db = db_connect();
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const collection = db.collection('games');
        const gameToSeek = game.selection;
        const categoryToSeek = game.categorySelection;

        if (gameToSeek){
          gameToSeek.forEach(game => {
            const docs = collection.find({title: game.title}).toArray(function (err, doc) {
              console.log(game);
              if (doc.length >= 1) {
                res.send({
                  message: 'Game already exists in our database',
                  status: 204,
                  game: doc
                });
                arrayErrors.push(doc);
              } else {
                const Games = mongoose.model('games', gamesSchema);
                const newGame = new Games({
                  title: game.title,
                  categoryName: categoryToSeek[0].categoryName
                });
                newGame.save(function (err) {
                  if (err){
                    countSuccess--;
                    console.log(err);
                  }
                  else {
                    countSuccess++;
                    arraySuccess.push(game);
                  }
                })
              }
            })
          });
        }
        returnErrors(res, arraySuccess, arrayErrors, 'added');
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
          return (res.send(doc))
        } else {
          return (res.send({
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
