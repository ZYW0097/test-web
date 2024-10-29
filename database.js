const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 設定資料庫文件的路徑
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// 創建 bookings 表
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        time TEXT NOT NULL,
        adults INTEGER NOT NULL,
        children INTEGER NOT NULL,
        childChairs INTEGER DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Could not create table:', err.message);
        }
    });
});

module.exports = db;
