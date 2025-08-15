const express = require('express');
const cors = require('cors');
const app = express();

// Use the port Render provides, fallback to 3000
const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(cors());
app.use(express.json());

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

// Root route for sanity check
app.get('/', (req, res) => res.send('Backend running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));