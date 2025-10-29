const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Experience = require('../models/Experience');
const experiencesData = require('../data/seed');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('🗑️  Cleared existing experiences');

    // Insert seed data
    await Experience.insertMany(experiencesData);
    console.log(`✅ Seeded ${experiencesData.length} experiences to database`);

    // Verify
    const count = await Experience.countDocuments();
    console.log(`📊 Total experiences in DB: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
