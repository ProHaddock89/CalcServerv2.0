const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    MT: { type: Number, required: true },
    TV: { type: Number, required: true }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
