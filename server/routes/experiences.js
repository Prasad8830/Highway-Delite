const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
    
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, using seed data');
      const filteredSeed = seed.filter(e => {
        if (search) {
          const term = search.toLowerCase();
          if (!e.title.toLowerCase().includes(term) && 
              !e.location?.toLowerCase().includes(term)) {
            return false;
          }
        }
        if (location && !e.location?.toLowerCase().includes(location.toLowerCase())) {
          return false;
        }
        if (minPrice && e.price < parseInt(minPrice)) return false;
        if (maxPrice && e.price > parseInt(maxPrice)) return false;
        return true;
      });
      return res.json(filteredSeed);
    }

    // Try to fetch from DB with timeout
    try {
      const experiences = await Promise.race([
        Experience.find(query),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 5000)
        )
      ]);

      if (experiences.length === 0 && Object.keys(query).length === 0) {
        console.log('DB empty, using seed data');
        return res.json(seed);
      }

      res.json(experiences);
    } catch (dbError) {
      console.error('Database query error:', dbError);
      // Fallback to seed data
      const filteredSeed = seed.filter(e => {
        if (search) {
          const term = search.toLowerCase();
          if (!e.title.toLowerCase().includes(term) && 
              !e.location?.toLowerCase().includes(term)) {
            return false;
          }
        }
        if (location && !e.location?.toLowerCase().includes(location.toLowerCase())) {
          return false;
        }
        if (minPrice && e.price < parseInt(minPrice)) return false;
        if (maxPrice && e.price > parseInt(maxPrice)) return false;
        return true;
      });
      res.json(filteredSeed);
    }
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      fallback: true,
      data: seed 
    });
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
