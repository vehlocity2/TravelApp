const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    tx_ref: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    currency: {type: String, default: 'NGN'},
    email: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    payment_link: {type: String},
    payment_response: {type: Object},
    status: {type: String, enum: ["pending", "successful", "failed"], default: "pending"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    tripId: {type: mongoose.Schema.Types.ObjectId, ref: "Trips", required: true},
    meta: { 
        numberOfGuests: { type: Number },
        specialRequest: { type: String },
        hotelApiId: { type: String },
        tripPrice: { type: Number },
        hotelPrice: { type: Number }
    }
},{timestamps:true})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction