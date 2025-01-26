const mongoose = require('mongoose');

// Environment variable for the MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

// Create separate connections for Notes and History databases
const notesConnection = mongoose.createConnection(`${MONGO_URI}/Notes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const historyConnection = mongoose.createConnection(`${MONGO_URI}/History`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the connections for use in models
module.exports = { notesConnection, historyConnection };
