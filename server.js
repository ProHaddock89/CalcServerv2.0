const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Make sure the path is correct

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

const app = express();

app.use(express.json());

// Your routes here...
const calculationHistoryRoutes = require('./routes/calculationHistory');
const notesRoutes = require('./routes/notes');

app.use('/api/calculationHistory', calculationHistoryRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
