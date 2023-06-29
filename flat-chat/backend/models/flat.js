const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  Address: {
    type: String,
    required: false,
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
    required: false
  },
  flatType: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

flatSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Flat', flatSchema);
