const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();  // Ensure MongoDB is connected

app.use('/api/notes', require('./routes/notes'));  // ✅ Ensure this line is here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
