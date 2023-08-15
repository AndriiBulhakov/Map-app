const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectWebflow = require('./locations/fetchData');

// load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on 
    port ${PORT}`);
});

// Route to trigger the connectWebflow function and send data to the frontend
app.get('/api/connect-webflow', async (req, res) => {
    try {
        const data = await connectWebflow(); // Get data from connectWebflow()
        res.json(data); // Send the data to the frontend
        console.log(data)
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from Webflow.' });
    }
});