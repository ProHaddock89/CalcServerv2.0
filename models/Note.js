const mongoose = require('mongoose');
const { notesConnection } = require('../config/db');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    MT: { type: Number, required: true },
    TV: { type: Number, required: true },
}, { timestamps: true, collection: 'Notes' });

module.exports = notesConnection.model('Note', NoteSchema);
