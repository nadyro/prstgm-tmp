const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

function db_connect() {
    mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
  const db = mongoose.connection;
    return (db);
}
exports.connect = async function (req, res) {
  let authResults;
    try {
        mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
      const db = mongoose.connection;
        console.log(req.body);
        console.log("Attempting to login...");
        db.on('error', function (err) {
            console.error(err);
        });
      db.once('open', function () {
        const collection = db.collection('users');
            collection.findOne({ email: req.body.email }, (function (err, docs) {
                if (docs) {
                    console.log(docs.password);
                    if (docs.password === req.body.password) {
                        console.log("Login Successful");
                        authResults = {
                            expiresIn: 7200,
                            accessToken: 'fdp',
                            user: docs
                        };
                        return (res.status(200).json({
                            status: 200,
                            authResults: authResults
                        }));
                    }
                }
                else {
                    console.log("This email doesn't exist in our database.");
                    authResults = 0;
                }
                db.close();
            }))
      });
    }
    catch (e) {
        throw Error(e);
    }
};
exports.getUserByEmail = async function (req, res) {
    try {
      const db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
      db.once('open', function () {
        const collection = db.collection('users');
            collection.findOne({ email: req.body.email }, function (err, docs) {
                if (docs) {
                    console.log(docs);
                    return (res.status(200).json({
                        status: 200,
                        user: docs
                    }))
                }
                else {
                    return (res.status(400).json({
                        status: 400,
                        message: 'User not found'
                    }))
                }
            })
        })
    }
    catch (e) {
        throw Error(e);
    }
};
exports.getUserById = async function (req, res) {
  try {
    // console.log('ICIIII')
    // console.log(req);
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('users');
      collection.findOne({_id: ObjectId(req.query.id)}, function (err, doc) {
        // console.log('wsh');
        if (doc) {
          if (res)
            return res.send(doc);
          else
            return (doc);
        } else {
          if (res) {
            return (res.status(400).json({
              status: 400,
              message: 'Something went wrong'
            }));
          } else {
            return ({
              status: 400,
              message: 'Something went wrong'
            })
          }
        }
      });
    })
  } catch (e) {
    throw Error(e);
  }
}
exports.getUsers = async function (req, res) {
    try {
      const db = db_connect();
        db.on('error', function (err) {
            console.error(err);
        });
      db.once('open', function () {
        const collection = db.collection('users');
        const docs = collection.find({}).toArray(function (err, docs) {
                if (docs) {
                  return res.send(docs);
                }
                else {
                    return (res.status(400).json({
                        status: 400,
                        message: 'Something went wrong'
                    }));
                }
            });
        })
    }
    catch (e) {
      console.log('we here');
        throw Error(e);
    }
};
exports.saveUser = async function (req, res) {
    try {
        console.log(req.body);
        mongoose.connect('mongodb://localhost/prostagma', { useNewUrlParser: true });
      const db = mongoose.connection;
        db.on('error', function (err) {
            console.error(err);
        });
      db.once('open', function () {
            console.log('connected');
        });
      const Schema = mongoose.Schema;
      const userSchema = new Schema({
            name: String,
            surname: String,
            email: String,
            password: String,
            birthday: Date,
            gender: Number,
            gender_specified: String,
            address: String,
            zip: Number,
            city: String,
            username: String
      });
      const User = mongoose.model('User', userSchema);
      const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            gender: req.body.gender,
            gender_specified: req.body.gender_specified,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            username: req.body.username
      });
        newUser.save(function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Saved : ', data);
            }
        })
    }
    catch (e) {
        throw Error(e);
    }
};
