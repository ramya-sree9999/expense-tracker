// app.js
const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Routes
app.use('/', transactionRoutes);

// Default route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Expense Tracker API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
