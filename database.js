const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// 創建 bookings 表
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        time TEXT,
        adults INTEGER,
        children INTEGER,
        childChairs INTEGER
    )`);
});

module.exports = db;
