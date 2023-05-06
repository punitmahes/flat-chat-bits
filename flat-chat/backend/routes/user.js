const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config()

//Authentication for private API request
function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

// Get all users
router.get('/', requireApiKey, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create a new user
router.post('/createUser', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    searchLocation: req.body.searchLocation,
    searchRadius: req.body.searchRadius,
    profilePicture: req.body.profilePicture,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.location != null) {
    res.user.location = req.body.location;
  }
  if (req.body.searchLocation != null) {
    res.user.searchLocation = req.body.searchLocation;
  }
  if (req.body.searchRadius != null) {
    res.user.searchRadius = req.body.searchRadius;
  }
  if (req.body.profilePicture != null) {
    res.user.profilePicture = req.body.profilePicture;
  }
  if (req.body.description != null) {
    res.user.description = req.body.description;
  }
  if (req.body.latitude != null) {
    res.user.latitude = req.body.latitude;
  }
  if (req.body.longitude != null) {
    res.user.longitude = req.body.longitude;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// Route to get users searching for flats in the same region and have not listed any flats
router.get('/users/nearby', (req, res) => {
  const { latitude, longitude, radius } = req.query;

  Flat.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: radius
      }
    }
  })
    .distinct('createdBy') // Get unique createdBy values
    .then(userIds => {
      User.find({
        _id: { $in: userIds },
        _id: { $nin: Flat.distinct('createdBy') } // Exclude users who have listed flats
      })
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ message: err.message }));
    })
    .catch(err => res.status(400).json({ message: err.message }));
});


module.exports = router;
