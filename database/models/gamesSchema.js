const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  title: String,
  categoryName: String,
  editor: String,
  releaseDate: Date,
  developer: String,
  picture: String,
});
