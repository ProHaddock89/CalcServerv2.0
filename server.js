const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');
const calculationHistoryRouter = require('./routes/calculationHistory');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/notes', notesRouter);
app.use('/api/calculationHistory', calculationHistoryRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`This Awesome Server is running on the port: http://localhost:${PORT}`);
});