// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('expense-tracker.db'); // Persistent DB file

// Create tables for transactions and categories
db.serialize(() => {
  // Create the categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
  )`);

  // Create the transactions table
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT
  )`);
});

module.exports = db;
