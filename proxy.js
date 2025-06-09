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

const API_KEY = '1a03b66d70904a868b8d2b9717659bf2_70496d7b91584b8cbcad7788df109843_andoraitools';

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Proxy Server! The API is running.');
});

// Proxy route for generating an image upload URL
app.post('/api/upload-url', async (req, res) => {
    const { size, contentType } = req.body;

    try {
        const response = await fetch('https://api.lightxeditor.com/external/api/v2/uploadImageUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({
                uploadType: "imageUrl",
                size,
                contentType
            })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to get upload URL', details: error.message });
    }
});

// Proxy route for initiating face swap
app.post('/api/face-swap', async (req, res) => {
    try {
        const { imageUrl, styleImageUrl } = req.body;

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
        console.error('Error:', error.message);
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
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to check order status', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
