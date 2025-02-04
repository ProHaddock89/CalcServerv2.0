const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRoutes = require('./routes/notes');
const historyRoutes = require('./routes/history'); // Import the new history route

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/history', historyRoutes); // Use history routes here

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));


////////*DOTENV STUFF *\\\\\\\\\
// SAVE HISTORY_DB_URI=mongodb+srv://prohaddock9:EyfAgOOxHiAX1g0A@asset-calculator.r1tlg.mongodb.net/History?retryWrites=true&w=majority&appName=Asset-Calculator
// SAVE NOTES_DB_URI=mongodb+srv://prohaddock9:EyfAgOOxHiAX1g0A@asset-calculator.r1tlg.mongodb.net/Notes?retryWrites=true&w=majority&appName=Asset-Calculator