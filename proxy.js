import express from 'express';
import fetch from 'node-fetch'; // For API requests
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const API_KEY = '82d3c4ed9a2f4162b77d30889fb6cd7a_ff5a3a1f764a416ea6fc4d37271f5267_andoraitools';

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Proxy Server! The API is running.');
});

// Proxy route for initiating face swap
app.post('/api/face-swap', async (req, res) => {
    console.log('Request received:', req.body); // Log the incoming request body

    try {
        const { imageUrl, styleImageUrl } = req.body;

        console.log('Processing face swap with:', imageUrl, styleImageUrl); // Debug inputs

        const response = await fetch('https://api.lightxeditor.com/external/api/v1/face-swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ imageUrl, styleImageUrl })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error:', error.message); // Log any errors
        res.status(500).json({ error: 'Failed to initiate face swap', details: error.message });
    }
});


// Proxy route for checking order status
app.post('/api/order-status', async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await fetch('https://api.lightxeditor.com/external/api/v1/order-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ orderId })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to check order status', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
