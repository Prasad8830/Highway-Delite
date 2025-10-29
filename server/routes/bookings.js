const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');
const seed = require('../data/seed');

// Promo codes (add more as needed)
const promoCodes = {
  'WELCOME10': { discount: 0.10, description: '10% off' },
  'SUMMER20': { discount: 0.20, description: '20% off' },
  'FIRST': { discount: 50, description: '₹50 off', type: 'fixed' }
};

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const { experienceId, date, time, qty, name, email, promoCode } = req.body;

    // Validation
    if (!experienceId || !date || !time || !name || !email) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    // Find the experience (try DB first, fallback to seed)
    let experience = await Experience.findOne({ id: experienceId });
    if (!experience) {
      experience = seed.find(e => e.id === experienceId);
    }
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Calculate pricing
    const quantity = qty || 1;
    let subtotal = experience.price * quantity;
    let discount = 0;
    let promoApplied = null;

    // Apply promo code if provided
    if (promoCode && promoCodes[promoCode.toUpperCase()]) {
      const promo = promoCodes[promoCode.toUpperCase()];
      promoApplied = promo;
      
      if (promo.type === 'fixed') {
        discount = promo.discount;
      } else {
        discount = Math.round(subtotal * promo.discount);
      }
    }

    const afterDiscount = subtotal - discount;
    const taxes = Math.round(afterDiscount * 0.06);
    const total = afterDiscount + taxes;

    // Generate reference ID
    const refId = `HD${uuidv4().slice(0, 6).toUpperCase()}`;

    // Create booking in database
    const booking = await Booking.create({
      refId,
      experienceId,
      experienceTitle: experience.title,
      date,
      time,
      qty: quantity,
      name,
      email,
      subtotal,
      discount,
      taxes,
      total,
      promoCode: promoApplied ? promoCode : null,
      status: 'confirmed'
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings/:refId - Get booking by reference ID
router.get('/:refId', async (req, res) => {
  try {
    const { refId } = req.params;
    const booking = await Booking.findOne({ refId });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/bookings - Get all bookings (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/bookings/validate-promo - Validate promo code
router.post('/validate-promo', (req, res) => {
  const { promoCode, subtotal } = req.body;
  
  if (!promoCode) {
    return res.status(400).json({ error: 'Promo code required' });
  }
  
  const promo = promoCodes[promoCode.toUpperCase()];
  
  if (!promo) {
    return res.status(404).json({ error: 'Invalid promo code' });
  }
  
  let discount = 0;
  if (promo.type === 'fixed') {
    discount = promo.discount;
  } else {
    discount = Math.round(subtotal * promo.discount);
  }
  
  res.json({
    valid: true,
    code: promoCode.toUpperCase(),
    description: promo.description,
    discount
  });
});

module.exports = router;
