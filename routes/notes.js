const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authenticateToken = require('../middleware/auth'); // Ensure authentication

// ➤ Get all notes for logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }); // ✅ Only fetch notes for this user
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Get a single note by ID (only if it belongs to the user)
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Create a new note
router.post('/', authenticateToken, async (req, res) => {
    const { title, MT, TV } = req.body;
    const userId = req.user.id;

    if (!title || MT === undefined || TV === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newNote = new Note({ userId, title, MT, TV });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ➤ Delete a note by ID (only if it belongs to the user)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully', deletedNote });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
