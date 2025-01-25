const express = require('express');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');
const historyRoutes = require('./routes/calculationHistory');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/calculationHistory', historyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
