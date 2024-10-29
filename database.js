const mongoose = require('mongoose');

// 替換為您的 MongoDB 連接字符串
const mongoURI = 'mongodb+srv://zywei097:<db_password>@test-web-db.ma336.mongodb.net/?retryWrites=true&w=majority&appName=test-web-db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    time: { type: Date, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    childChairs: { type: Number, default: 0 }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
