const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const secretSchema = new Schema({
  userId: String,
  secret: String,
  secretType: String,
});

module.exports = mongoose.model('secrets', secretSchema);
