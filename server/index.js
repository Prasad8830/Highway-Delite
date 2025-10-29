const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const experiencesRouter = require('./routes/experiences');
const bookingsRouter = require('./routes/bookings');

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// static images (you can drop images inside server/public/images)
app.use('/images', express.static(__dirname + '/public/images'));

// Health check endpoints
app.get('/', (req, res) => res.json({ message: 'Highway Delite API Server' }));
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
