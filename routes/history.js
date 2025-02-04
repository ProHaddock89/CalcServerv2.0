const express = require('express');
const router = express.Router();
const History = require('../models/History');

// ➤ Get all history entries
router.get('/', async (req, res) => {
    try {
        const history = await History.find();
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Add a new history entry
router.post('/', async (req, res) => {
    const { id, title, PP, SL, NC, result } = req.body;
    
    if (!title || PP === undefined || SL === undefined || NC === undefined || result === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newHistory = new History({ id, title, PP, SL, NC, result });
        await newHistory.save();
        res.status(201).json(newHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Delete a specific history entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedHistory = await History.findByIdAndDelete(req.params.id);
        if (!deletedHistory) return res.status(404).json({ message: 'History entry not found' });
        res.json({ message: 'History entry deleted successfully', deletedHistory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ➤ Delete all history
router.delete('/', async (req, res) => {
    try {
        await History.deleteMany({});
        res.json({ message: 'All history entries deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
