const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
const returnErrors = require('./gamesDb.controller');
const categoriesSchema = new Schema({
  categoryName: String,
  picture: String,
});

function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  const db = mongoose.connection;
  return (db);
}

exports.deleteCategories = async function (req, res) {
  try {
    let errorList = [];
    let successList = [];
    const categoryId = req.params.id;
    if (categoryId) {
      const db = db_connect();
      db.on('error', function (err) {
        throw err;
      });
      db.once('open', function () {
        const collection = db.collection('categories');
        const docs = collection.deleteOne({_id: ObjectId(categoryId)}, function (err, data) {
          if (err) {
            returnErrors.returnErrors(res, successList, errorList, 'deleted');
          } else {
            successList.push(data);
            module.exports.getCategories(req, res);
          }
        })
      })
    }
  }
  catch (e) {
    throw Error(e);
  }
}
exports.getCategories = async function (req, res) {
  try {
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('categories');
      let docs = collection.find({}).toArray(function (err, doc) {
        return (res.send(doc))
      });
    });
  } catch (e) {
    throw Error(e);
  }
};

exports.addCategories = async function (req, res) {
  try {
    const category = req.body.categoriesForm;
    if (category) {
      const db = db_connect();
      db.on('error', function (err) {
        console.error(err);
      });
      db.once('open', function () {
        const categoryToSeek = category.selection;
        if (categoryToSeek) {
          const Categories = mongoose.model('categories', categoriesSchema);
          const newCategory = new Categories({
            categoryName: categoryToSeek[0].categoryName,
            picture: ''
          });
          newCategory.save(function (err) {
            if (err) {
              console.error(err);
            } else {
              module.exports.getCategories(req, res);
            }
          })
        }
      });
    }
  } catch (e) {
    throw Error(e);
  }
};
