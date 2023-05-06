const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Flat', flatSchema);
