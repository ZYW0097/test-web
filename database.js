const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoURI = 'mongodb+srv://zywei097:BFiolrXvvk3JMExn@test-web-db.ma336.mongodb.net/?retryWrites=true&w=majority&appName=test-web-db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// 定義 Booking 模型的 Schema
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    time: { type: Date, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    childChairs: { type: Number, default: 0 }
});

// 創建 Booking 模型
const Booking = mongoose.model('Booking', bookingSchema);

// 將 Booking 模型導出
module.exports = Booking;
