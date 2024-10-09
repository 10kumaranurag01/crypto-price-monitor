require('dotenv').config();
const connectDB = require('./config/database');
const app = require('./app');
const fetchCryptoData = require('./jobs/fetchCryptoData');

// Connect to DB
connectDB();

// Start background job
fetchCryptoData();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
