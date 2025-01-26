const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');

const app = express();

// Middleware
app.use(cors()); // Adjust origin if needed
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use(notesRoutes);

// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
