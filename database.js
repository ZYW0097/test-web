const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // 或 true

// 替換為您的 MongoDB 連接字符串
const mongoURI = 'mongodb+srv://zywei097:BFiolrXvvk3JMExn@test-web-db.ma336.mongodb.net/?retryWrites=true&w=majority&appName=test-web-db';

// 使用一個標誌來檢查是否已經連接
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return; // 如果已經連接，則不重複連接

    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true; // 更新連接狀態
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
    }
};

// 訂位 Schema
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

// 導出連接函數和模型
module.exports = { connectDB, Booking };
