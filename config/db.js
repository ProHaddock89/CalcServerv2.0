const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// Connect to the MongoDB databases
const connectDB = () => {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};

// Export the function so it can be used elsewhere
module.exports = connectDB;
