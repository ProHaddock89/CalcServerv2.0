const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get all history entries
router.get('/', async (req, res) => {
    try {
        const history = await History.find();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new history entry
router.post('/', async (req, res) => {
    try {
        const newHistory = new History(req.body);
        const savedHistory = await newHistory.save();
        res.status(201).json(savedHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a specific history entry
router.delete('/:id', async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id);
        res.json({ message: 'History entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete all history entries
router.delete('/', async (req, res) => {
    try {
        await History.deleteMany();
        res.json({ message: 'All history entries deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
