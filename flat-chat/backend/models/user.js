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
  },
  reason: {
    type: String,
    enum: ['PS1', 'PS2', 'SI', 'Job'],
    required: false
  },
  role : {
    type: String,
    require : true
  },
  preferredRoommate: {
    type: String,
    enum: ['M','F','Any'],
    require: true
  },
  budget: {
    type: [Number],
    require: true
  },
  yearOfStudy: {
    type: [Number],
    require: true,
    validate: [
      {
        validator: function (value) {
          const currentYear = new Date().getFullYear();
          return value < currentYear;
        },
        message: 'Year of study should be before the current year'
      },
      {
        validator: function (value) {
          return value > 2015;
        },
        message: 'Year of study should be greater than 2015'
      }
    ]
  }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
