const express = require('express');
const router = express.Router();

// Example: In-memory storage for notes (replace with a database in production)
let notes = [];

// Route to get all notes
router.get('/', (req, res) => {
    res.json(notes);
});

// Route to create a new note
router.post('/', (req, res) => {
    const newNote = req.body;
    notes.push(newNote); // Save the note (consider adding validation)
    res.status(201).json(newNote); // Respond with the created note
});

// Additional routes for notes (e.g., update, delete) can go here

module.exports = router;