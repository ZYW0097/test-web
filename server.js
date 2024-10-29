const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database'); // 引入 database.js
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let bookings = [];

// 新增訂位
app.post('/book', (req, res) => {
    const { name, phone, time, adults, children, childChairs } = req.body;
    const query = 'INSERT INTO bookings (name, phone, time, adults, children, childChairs) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.run(query, [name, phone, time, adults, children, childChairs], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: '訂位成功!', id: this.lastID });
    });
});
// 獲取當日訂位
app.get('/api/bookings', (req, res) => {
    const query = 'SELECT * FROM bookings';
    
    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  process.on('SIGINT', () => {
    db.close();
    console.log('Database connection closed.');
    process.exit(0);
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
