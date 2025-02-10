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
router.post("/", authenticateToken, async (req, res) => {
    try {
        console.log("🔹 Incoming request to save note");
        console.log("👤 User ID:", req.user?.userId);
        console.log("📄 Note Data:", req.body);

        const { title, MT, TV } = req.body;
        if (!title || MT === undefined || TV === undefined) {
            console.error("❌ Missing note data!");
            return res.status(400).json({ message: "Title, MT, and TV are required" });
        }

        const newNote = new Note({
            userId: req.user.userId, // Ensure this is set correctly
            title,
            MT,
            TV
        });

        await newNote.save();
        console.log("✅ Note saved:", newNote);
        res.status(201).json(newNote);
    } catch (error) {
        console.error("❌ Error saving note:", error);
        res.status(500).json({ message: "Server error", error: error.message });
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
