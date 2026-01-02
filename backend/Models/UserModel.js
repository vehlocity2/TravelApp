const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: { type: Number, required: true},
    gender: { type: String, required: true},
    image: { type : String, default: ""},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followersCount: { type: Number, default: 0},
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followingCount: { type: Number, default: 0},
    bio: { type: String},
}, {timestamps: true})

userSchema.virtual('auths',{
    ref: 'Auth',
    localField: '_id',
    foreignField: 'userId'
})

userSchema.set('toObject',{ virtuals: true})
userSchema.set('toJSON', { virtuals: true })

const User = mongoose.model('User', userSchema)

module.exports = User

