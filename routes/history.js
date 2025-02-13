const express = require('express');
const router = express.Router();
const History = require('../models/History');
const authenticateToken = require('../middleware/auth'); // Ensure authentication

// ➤ Get all history entries for logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const history = await History.find({ userId: req.user.id });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Add a new history entry
router.post('/', authenticateToken, async (req, res) => {
    console.log("🔹 Received request to save history:", req.body);
    console.log("🔹 Authenticated user ID:", req.user.id);

    const { title, PP, SL, NC, result } = req.body;

    if (!title || PP === undefined || SL === undefined || NC === undefined || result === undefined) {
        console.error("❌ Missing fields in history entry:", req.body);
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newHistory = new History({ userId: req.user.id, title, PP, SL, NC, result });
        const savedHistory = await newHistory.save();
        console.log("✅ History saved successfully:", savedHistory);
        res.status(201).json(savedHistory);
    } catch (err) {
        console.error("❌ Error saving history:", err.message);
        res.status(500).json({ message: err.message });
    }
});


// ➤ Delete a specific history entry (only if it belongs to the user)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedHistory = await History.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedHistory) return res.status(404).json({ message: 'History entry not found' });
        res.json({ message: 'History entry deleted successfully', deletedHistory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Delete all history for logged-in user
router.delete('/', authenticateToken, async (req, res) => {
    try {
        await History.deleteMany({ userId: req.user.id });
        res.json({ message: 'All history entries deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
