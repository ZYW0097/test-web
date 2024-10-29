const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // 引入 mongoose
const Booking = require('./database'); // 引入 MongoDB 模型
const app = express();
const port = process.env.PORT || 3000;

// 連接到 MongoDB
const mongoDB = 'mongodb://<username>:<password>@localhost:27017/mydatabase'; // 修改為您的 MongoDB URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// 中介軟體設定
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 新增訂位
app.post('/book', (req, res) => {
    const { name, phone, time, adults, children, childChairs } = req.body;
    const newBooking = new Booking({ name, phone, time, adults, children, childChairs });

    newBooking.save()
        .then(() => res.json({ message: '訂位成功!', id: newBooking._id }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// 獲取當日訂位
app.get('/api/bookings', (req, res) => {
    Booking.find()
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
