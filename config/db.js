const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const notesConnection = mongoose.createConnection(`${MONGO_URI}Notes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const historyConnection = mongoose.createConnection(`${MONGO_URI}History`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { notesConnection, historyConnection };
