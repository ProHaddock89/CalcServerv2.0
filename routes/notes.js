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
router.post("/", authenticateToken, async (req, res) => { // ✅ Add `authenticateToken`
    //console.log("📌 Incoming Request Body:", req.body);
    // console.log("📥 Incoming body:", req.body);  // <--- ADD THIS LINE
    try {
        const { title, MT, TV, FracOne, FracTwo } = req.body;

        const newNote = new Note({
            userId: req.user.id, // ✅ Use `id`, not `userId`
            title,
            MT,
            TV,
            FracOne,
            FracTwo
        });

        await newNote.save();
        //console.log("✅ Note saved:", newNote);
        
        res.status(201).json(newNote);
    } catch (error) {
        console.error("❌ Save Error:", error);
        res.status(500).json({ message: "Error saving note", error: error.message });
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
