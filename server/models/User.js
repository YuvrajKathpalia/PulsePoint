const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  savedArticles: [
    {
      title: String,
      urlToImage: String
    }
  ]
});

module.exports = mongoose.model('User', UserSchema); //model ka naam User...yhi chlega har jagah
