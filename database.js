const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// 設定資料庫文件的路徑
const dbPath = path.join(__dirname, 'database.db');

// 檢查資料庫文件是否存在，若不存在則創建
const dbExists = fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// 若資料庫不存在，則創建 bookings 表
if (!dbExists) {
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
            } else {
                console.log('Bookings table created.');
            }
        });
    });
}

// 關閉資料庫連接（建議在應用程式結束時進行）
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

module.exports = db;
