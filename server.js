const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // 引入 mongoose
const { connectDB, bookings } = require('./database'); // 引入連接函數和模型
require('dotenv').config(); // 載入環境變數

const app = express();
const port = process.env.PORT || 3000;

// 連接到 MongoDB
connectDB();

// 中介軟體設定
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 新增訂位
app.post('/book', (req, res) => {
    const { name, phone, time, adults, children, childChairs } = req.body;
    console.log('Received bookings:', req.body); // 確認收到的資料

    const newbookings = new bookings({ name, phone, time, adults, children, childChairs }); // 使用 Bookings

    newbookings.save()
        .then(() => res.json({ message: '訂位成功!', id: newbookings._id }))
        .catch(err => {
            console.error('Error saving bookings:', err.message); // 打印錯誤
            res.status(500).json({ error: err.message });
        });
});

// 獲取所有訂位
app.get('/api/bookings', (req, res) => {
    bookings.find() // 使用 Bookings
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({ error: err.message }));
});

// 頁面路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
