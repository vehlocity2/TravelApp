const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isAdmin: { type: Boolean, default: false}
},{timestamps: true})

const Auth = mongoose.model("Auth",authSchema )

module.exports = Auth