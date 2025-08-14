const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id: String,
    title: String,
    PP: Number,
    SL: Number,
    NC: Number,
    result: Number,
    PR: Number,  // Add Percentage Risk field
    AUM: Number, // Add Assets Under Management field
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;