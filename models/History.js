const { historyConnection } = require('../config/connectDB'); // Import the History connection
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        PP: { type: Number, required: true },
        SL: { type: Number, required: true },
        NC: { type: Number, required: true },
        result: { type: Number, required: true },
    },
    { 
        timestamps: true 
    }
);

module.exports = historyConnection.model('History', HistorySchema); // Use the History connection
