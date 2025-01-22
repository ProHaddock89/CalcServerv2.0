const express = require('express');
const axios = require('axios');
const router = express.Router();

const backendURL = 'https://calc-server-hgvf.onrender.com/api/calculationHistory';

// Route to get all calculation history from the backend
router.get('/proxyHistory', async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] Fetching calculation history...`);
        const response = await axios.get(backendURL);
        console.log(`[${new Date().toISOString()}] Calculation history fetched successfully.`);
        res.json(response.data); // Respond with data from the backend
    } catch (error) {
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        console.error(`[${new Date().toISOString()}] Error fetching calculation history:`, errorMessage);
        res.status(500).json({ error: `Failed to retrieve calculation history: ${errorMessage}` });
    }
});

// Route to create a new calculation history entry
router.post('/proxyHistory', async (req, res) => {
    try {
        const newEntry = req.body;
        if (!newEntry || Object.keys(newEntry).length === 0) {
            return res.status(400).json({ error: 'Invalid input. Body cannot be empty.' });
        }

        console.log(`[${new Date().toISOString()}] Sending new entry to backend:`, newEntry);
        const response = await axios.post(backendURL, newEntry, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`[${new Date().toISOString()}] History entry saved successfully.`);
        res.status(201).json(response.data); // Respond with created entry
    } catch (error) {
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        console.error(`[${new Date().toISOString()}] Error saving calculation history:`, errorMessage);
        res.status(500).json({ error: `Failed to save calculation history: ${errorMessage}` });
    }
});

module.exports = router;
