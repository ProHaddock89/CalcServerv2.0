const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    id: String,
    title: String,
    PP: Number,
    SL: Number,
    NC: Number,
    result: Number,
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;
