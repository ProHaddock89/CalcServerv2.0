const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
require('dotenv').config();


dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
