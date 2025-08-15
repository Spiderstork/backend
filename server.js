const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// API routes
let items = [
  { id: 1, name: 'Apple', price: 1.2 },
  { id: 2, name: 'Banana', price: 0.8 },
];

app.get('/api/items', (req, res) => res.json(items));
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Catch-all route to serve index.html for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
