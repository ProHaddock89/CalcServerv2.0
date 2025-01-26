// server.js

const express = require('express');
const connectDB = require('./config/db'); // Adjust the path if needed

const app = express();

// Connect to MongoDB
connectDB();

app.listen(10000, () => {
    console.log('Server running on port 10000');
});
