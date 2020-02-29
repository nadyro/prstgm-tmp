const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
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

function db_connect() {
  mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
  console.log('connected');
  const db = mongoose.connection;
  return (db);
}

exports.connect = async function (req, res) {
  let authResults;
  try {
    const db = db_connect();
    console.log("Attempting to login...");
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('users');
      collection.findOne({email: req.body.email}, (function (err, docs) {
        if (docs) {
          if (docs.password === req.body.password) {
            console.log("Login Successful");
            authResults = {
              credentials: {
                expiresIn: 7200,
                accessToken: '123',
              },
              object: docs,
              success: true,
              message: 'Login successful !'
            };
            db.close();
            return res.send(authResults);
          } else {
            authResults = {
              credentials: null,
              object: null,
              success: false,
              message: 'Email or password incorrect.'
            };
            db.close();
            return res.send(authResults);
          }
        } else {
          console.log("This email doesn't exist in our database.");
          authResults = {
            credentials: null,
            object: null,
            success: false,
            message: 'This email doesn\'t exist in our database.'
          };
          db.close();
          return res.send(authResults);
        }
      }))
    });
  } catch (e) {
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
      collection.findOne({email: req.body.email}, function (err, docs) {
        if (docs) {
          return (res.status(200).json({
            status: 200,
            user: docs
          }))
        } else {
          return (res.status(400).json({
            status: 400,
            message: 'User not found'
          }))
        }
      })
    })
  } catch (e) {
    throw Error(e);
  }
};
exports.getUserById = async function (req, res) {
  try {
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('users');
      collection.findOne({_id: ObjectId(req.query.id)}, function (err, doc) {
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
};
exports.getUsers = async function (req, res) {
  try {
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const collection = db.collection('users');
      collection.find({}).toArray(function (err, docs) {
        if (docs) {
          return res.send(docs);
        } else {
          return (res.status(400).json({
            status: 400,
            message: 'Something went wrong'
          }));
        }
      });
    })
  } catch (e) {
    throw Error(e);
  }
};
exports.saveUser = async function (req, res) {
  try {
    let authResults;
    const db = db_connect();
    db.on('error', function (err) {
      console.error(err);
    });
    db.once('open', function () {
      const User = mongoose.model('User', userSchema);
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      });
      newUser.save(function (err, data) {
        if (err) {
          console.error(err);
          authResults = {
            credentials: null,
            object: null,
            success: false,
            message: 'Failed to create account.'
          };
          return res.send(authResults);
        } else {
          authResults = {
            credentials: {
              expiresIn: 7200,
              accessToken: '123',
            },
            object: data,
            success: true,
            message: 'Subscription successful !'
          };
          return res.send(authResults);
        }
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
