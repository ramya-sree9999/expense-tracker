// routes/transactions.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Add a new transaction
router.post('/transactions', (req, res) => {
  const { type, category, amount, date, description } = req.body;
  db.run(
    `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
    [type, category, amount, date, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Get all transactions
router.get('/transactions', (req, res) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a specific transaction by ID
router.get('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(row);
  });
});

// Update a transaction by ID
router.put('/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ updatedID: this.changes });
    }
  );
});

// Delete a transaction by ID
router.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deletedID: this.changes });
  });
});

module.exports = router;
