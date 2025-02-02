const mongoose = require("mongoose");

const notesConnection = mongoose.createConnection(process.env.NOTES_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const historyConnection = mongoose.createConnection(process.env.HISTORY_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { notesConnection, historyConnection };
