const fs = require('fs');
const path = require('path');
const notesFilePath = path.join(__dirname, '../data/notes.json');
const calculationHistoryFilePath = path.join(__dirname, '../data/calculationHistory.json');

// Get notes
exports.getNotes = (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });

        let notes = JSON.parse(data);
        console.log("Fetched notes before id assignment:", notes);  // Log to inspect fetched notes

        // Add missing ids if necessary
        notes = notes.map(note => {
            if (!note.id) {
                note.id = Date.now().toString();  // Generate id if missing
            }
            return note;
        });

        console.log("Fetched notes after id assignment:", notes);  // Log to confirm ids are added
        res.json(notes);
    });
};



// Create a new note
exports.createNote = (req, res) => {
    const newNote = { id: Date.now().toString(), ...req.body };
    console.log('New Note to save:', newNote); // Log the note to confirm id is generated

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to save note' });
            res.status(201).json(newNote); // Respond with the newly created note
        });
    });
};


// Delete a note
// Delete a note
exports.deleteNote = (req, res) => {
    const { id } = req.params;  // Getting the ID from the request

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });

        let notes = JSON.parse(data);
        console.log("Before deletion:", notes);  // Check the notes before deletion

        // Remove the note that matches the ID
        notes = notes.filter(note => note.id !== id);
        
        console.log("After deletion:", notes);  // Check the notes after deletion

        // Write the updated notes back to the file
        fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to delete note' });
            res.status(204).send();  // Send a 204 response to indicate successful deletion
        });
    });
};



// Delete a calculation history entry
exports.deleteCalculationHistory = (req, res) => {
    const { id } = req.params;

    fs.readFile(calculationHistoryFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read calculation history' });
        
        let history = JSON.parse(data);
        history = history.filter(entry => entry.id !== id);

        fs.writeFile(calculationHistoryFilePath, JSON.stringify(history, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to delete calculation history entry' });
            res.status(204).send(); // No content
        });
    });
};