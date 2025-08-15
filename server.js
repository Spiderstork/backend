const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data for demo
let items = [
  { id: 1, name: 'Apple', price: 1.2 },
  { id: 2, name: 'Banana', price: 0.8 },
];

// API routes
app.get('/api/items', (req, res) => res.json(items));

app.post('/api/items', (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid name or price' });
  }

  const newItem = { id: items.length + 1, name, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Catch-all route for SPA (only if not API)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
