const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// ➤ Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Get a single note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Create a new note
router.post('/', async (req, res) => {
    const { title, MT, TV } = req.body;

    if (!title || MT === undefined || TV === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newNote = new Note({ title, MT, TV });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully', deletedNote });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
