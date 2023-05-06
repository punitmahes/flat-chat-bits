const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  searchLocation: {
    type: String,
    required: true
  },
  searchRadius: {
    type: Number,
    required: true
  },
  profilePicture: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
