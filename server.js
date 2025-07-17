const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const docsRouter = require('./routes/docs');

const app = express();
const PORT = process.env.PORT || 6000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://oliveit:docs@cluster0.1fibmaf.mongodb.net/OliveIt?retryWrites=true&w=majority&appName=Cluster0';

// CORS configuration
const corsOptions = {
  origin: [
    'https://oliveit.club',
    'https://www.oliveit.club',
    'https://popcorn.oliveit.club',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add CORS headers for preflight requests
app.options('*', cors(corsOptions));

// Routes
app.use('/api/docs', docsRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
