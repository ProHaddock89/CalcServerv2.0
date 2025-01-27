const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

const notesConnection = mongoose.createConnection(`${MONGO_URI}Notes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const historyConnection = mongoose.createConnection(`${MONGO_URI}History`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connectDB, notesConnection, historyConnection };

