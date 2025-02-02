const mongoose = require("mongoose");
const { notesConnection } = require("../config/db");

if (!notesConnection) {
  throw new Error("notesConnection is undefined");
}

const noteSchema = new mongoose.Schema({
  title: String,
  MT: Number,
  TV: Number,
});

const Note = notesConnection.model("Note", noteSchema);

module.exports = Note;
