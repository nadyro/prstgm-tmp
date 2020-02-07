const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const categoriesSchema = new Schema({
  categoryName: String,
  picture: String,
});

function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  const db = mongoose.connection;
  return (db);
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
