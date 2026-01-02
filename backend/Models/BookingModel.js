const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trips', required: true },
    numberOfGuests: { type: Number, required: true },
    specialRequest: {type: String},
    hotelApiId: { type: String, required: true},
    totalPrice: { type: Number, required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    bookingReference: { type: String, required: true, unique: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
