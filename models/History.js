const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id: String,
    title: String,
    PP: Number,
    SL: Number,
    NC: Number,
    result: Number,
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;
