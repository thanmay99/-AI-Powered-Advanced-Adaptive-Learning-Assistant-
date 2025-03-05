require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const tutorRoutes = require('./routes/tutorRoutes');  // Ensure AI Tutor routes are included

const app = express();
const PORT = 5000;
const DB_URI = 'mongodb://localhost:27017/authentication';

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use('/', authRoutes);
app.use('/api/tutor', tutorRoutes);  // Ensure this is included

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
