const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  location: String,
  short: String,
  price: {
    type: Number,
    required: true
  },
  image: String,
  about: String,
  times: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
