require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;  // Ensure this is not undefined

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Make sure it is set in the environment variables.");
    process.exit(1); // Stop the server if MongoDB URI is missing
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

////////*DOTENV STUFF *\\\\\\\\\
// SAVE HISTORY_DB_URI=mongodb+srv://prohaddock9:EyfAgOOxHiAX1g0A@asset-calculator.r1tlg.mongodb.net/History?retryWrites=true&w=majority&appName=Asset-Calculator
// SAVE NOTES_DB_URI=mongodb+srv://prohaddock9:EyfAgOOxHiAX1g0A@asset-calculator.r1tlg.mongodb.net/Notes?retryWrites=true&w=majority&appName=Asset-Calculator