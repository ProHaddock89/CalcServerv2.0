// server.js

const express = require('express');
const connectDB = require('./config/db'); // Adjust the path if needed
const cors = require('cors');
const app = express();

// Allow CORS for your frontend domain
app.use(cors({
    origin: 'https://your-frontend-url.com', // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Other middleware and routes


// Connect to MongoDB
connectDB();

app.listen(10000, () => {
    console.log('Server running on port 10000');
});
