// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE Tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    custo REAL,
    data_limite TEXT,
    ordem INTEGER UNIQUE
  )`);
});

module.exports = db;
