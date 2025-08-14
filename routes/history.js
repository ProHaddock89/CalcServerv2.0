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

    const { title, PP, SL, NC, result, PR, AUM } = req.body; // Extract PR and AUM

    if (!title || PP === undefined || SL === undefined || NC === undefined || result === undefined) {
        console.error("❌ Missing fields in history entry:", req.body);
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    try {
        const newHistory = new History({ 
            userId: req.user.id, 
            title, 
            PP, 
            SL, 
            NC, 
            result,
            PR: PR !== undefined ? PR : null,   // Include PR (can be null)
            AUM: AUM !== undefined ? AUM : null // Include AUM (can be null)
        });
        
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
        const result = await History.deleteMany({ userId: req.user.id }); // ✅ Only delete user's history
        res.json({ message: 'All history entries for the user deleted successfully', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;