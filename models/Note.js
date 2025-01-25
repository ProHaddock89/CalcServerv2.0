const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    MT: { type: Number, required: true },
    TV: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
