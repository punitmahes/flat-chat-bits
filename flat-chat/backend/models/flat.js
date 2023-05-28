const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
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
  },
  type: {
    type: String,
    enum: ['Non-Furnished','Semi-Furnished','Fully-Furnished'],
    require: true
  }
});

flatSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Flat', flatSchema);
