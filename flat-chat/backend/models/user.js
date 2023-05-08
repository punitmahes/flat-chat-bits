const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Userid: mongoose.Schema.Types.ObjectId, 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
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
  searchRadius: {
    type: Number,
    required: false
  },
  profilePicture: {
    type: String,
    required: false
  },
  companyName: {
    type: String,
    required: false
  },
  description: {
    type: String,
    require: false
  },
  googleId: {
    type: String,
    unique: true
  }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
