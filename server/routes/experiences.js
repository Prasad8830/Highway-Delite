const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const seed = require('../data/seed');

// GET /api/experiences - with optional search query
router.get('/', async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    // Build MongoDB query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    // Try to fetch from DB, fallback to seed data
    let experiences = await Experience.find(query);
    
    // If DB is empty, use seed data and optionally populate DB
    if (experiences.length === 0 && Object.keys(query).length === 0) {
      console.log('DB empty, using seed data');
      experiences = seed;
    }
    
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    // Fallback to seed data on error
    res.json(seed);
  }
});

// GET /api/experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to fetch from DB
    let exp = await Experience.findOne({ id });
    
    // Fallback to seed data
    if (!exp) {
      exp = seed.find(e => e.id === id);
    }
    
    if (!exp) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(exp);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
