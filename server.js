const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Ensure this path is correct

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();  // Ensure this is correctly imported and called

app.listen(5000, () => console.log(`Server running on port 5000`));
