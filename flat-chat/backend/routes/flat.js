const express = require('express');
const router = express.Router();
const Flat = require('../models/flat');
const { body, validationResult } = require('express-validator');

//authentication for private API requests
function requireApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
  
// Get all flats
router.get('/', requireApiKey, async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single flat
router.get('/:id', getFlat, (req, res) => {
  res.json(res.flat);
});

// Create a new flat
router.post('/createFlat', 
[
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('rent').isNumeric().withMessage('Rent must be a number'),
    body('bedrooms').isNumeric().withMessage('Bedrooms must be a number'),
    body('description').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters')
],
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }  
    const flat = new Flat({
        location: req.body.location,
        rent: req.body.rent,
        bedrooms: req.body.bedrooms,
        description: req.body.description,
        createdBy: req.body.createdBy
    });

  try {
    const newFlat = await flat.save();
    res.status(201).json(newFlat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a flat
router.patch('/:id', getFlat, async (req, res) => {
  if (req.body.location != null) {
    res.flat.location = req.body.location;
  }
  if (req.body.rent != null) {
    res.flat.rent = req.body.rent;
  }
  if (req.body.bedrooms != null) {
    res.flat.bedrooms = req.body.bedrooms;
  }
  if (req.body.description != null) {
    res.flat.description = req.body.description;
  }

  try {
    const updatedFlat = await res.flat.save();
    res.json(updatedFlat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a flat
router.delete('/:id', getFlat, async (req, res) => {
  try {
    await res.flat.remove();
    res.json({ message: 'Flat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single flat by ID
async function getFlat(req, res, next) {
  let flat;
  try {
    flat = await Flat.findById(req.params.id);
    if (flat == null) {
      return res.status(404).json({ message: 'Cannot find flat' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.flat = flat;
  next();
}

// Route to get flats within a certain radius of a point
router.get('/flats/nearby', (req, res) => {
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
      .populate('createdBy', 'name email') // Populate createdBy field with user data
      .then(flats => res.json(flats))
      .catch(err => res.status(400).json({ message: err.message }));
  });

module.exports = router;
