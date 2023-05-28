const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {body, validationResult} = require('express-validator')
const passport = require('passport');
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

router.get('/unique/coordinates', requireApiKey, async (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  const radius = parseFloat(req.query.radius);
  console.log(latitude);
  try {
    const coordinatesWithCompanyNames = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [ latitude , longitude ] },
          distanceField: "dist.calculated",
          maxDistance: radius,
          includeLocs: "dist.location",
          spherical: true
       }
      },
      {
        $group: {
          _id: '$location.coordinates',
          companyName: { $first: '$companyName' }
        }
      },
      {
        $project: {
          coordinates: '$_id',
          companyName: 1,
          _id: 0
        }
      }
    ]).exec();
    res.json(coordinatesWithCompanyNames);
  }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', requireApiKey, async (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  try {
    User.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude]
          },
          $maxDistance: 0.5
        }
      }
    }).then(users=>res.json(users));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// Get a single user
router.get('/:id', getUser, (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id).then(user=>{
    res.json(user);
  }).catch(err=>{res.send("Failed")});
});

router.get('/user',(req, res)=>{
  res.send(req.user);
});

// Create a new user
router.post('/createUser', 
async (req, res) => {
  console.log(req.body);
  if(!req.body.user){
    res.redirect('/auth/google')
  }
  User.findById(req.body.user._id).then(user =>
    {
      user.companyName = compnayName;
      user.location = {type : "Point", coordinates : [latitude,longitude]};
      user.description = description;
      user.reason = reason;
      user.role = role;
      user.preferredRoommate = preferredRoommate;
      user.budget = budget;
      user.yearOfStudy = yearOfStudy;
      user.save();
      console.log(user);
      res.status(200).json(user);
    }).catch(err=>res.status(201).send("Cannout Update profile :" + err));
  });


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect to the page where the user can fill in their details
  res.redirect('/users/create');
});


// Update a user
router.patch('/:id', getUser, async (req, res) => {
  console.log(req.body)
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if(req.body.companyName != null){
    res.user.companyName = req.body.companyName;
  }
  if (req.body.description != null) {
    res.user.description = req.body.description;
  }
  if (req.body.latitude != null && req.body.longitude != null) {
    res.user.location = {type:"Point", coordinates:[req.body.latitude,req.body.longitude]}
  }
  if (req.body.reason != null) {
    res.user.reason = req.body.reason;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  if (req.body.preferredRoommate != null) {
    res.user.preferredRoommate = req.body.preferredRoommate;
  }
  if (req.body.budget != null) {
    res.user.budget = req.body.budget;
  }
  if (req.body.yearOfStudy != null) {
    res.user.yearOfStudy = req.body.yearOfStudy;
  };

  try {
    const updatedUser = await res.user.save();
    console.log(updatedUser);
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
