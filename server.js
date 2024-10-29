const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let bookings = [];

// 新增訂位
app.post('/bookings', (req, res) => {
  const booking = req.body;
  bookings.push(booking);
  res.status(201).send('訂位已新增');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// 獲取當日訂位
app.get('/bookings/today', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayBookings = bookings.filter(booking => booking.time.startsWith(today));
  res.json(todayBookings);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});