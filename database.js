const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bookings.db');

// 創建表格
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    time TEXT NOT NULL
  )`);
});

module.exports = db;
