const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    MT: { type: Number, required: true },
    TV: { type: Number, required: true }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
