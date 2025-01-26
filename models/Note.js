const { notesConnection } = require('../config/connectDB'); // Import the Notes connection
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        MT: { type: Number, required: true },
        TV: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: 'Notes',
    }
);

module.exports = notesConnection.model('Note', NoteSchema); // Use the Notes connection
