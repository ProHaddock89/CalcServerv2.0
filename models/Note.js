const { notesConnection } = require('../config/db').notesConnection;  // Ensure the path is correct
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    MT: { type: Number, required: true },
    TV: { type: Number, required: true },
}, { timestamps: true, collection: 'Notes' });
if (!notesConnection) {
    throw new Error('notesConnection is undefined');
}
module.exports = notesConnection.model('Note', NoteSchema);
