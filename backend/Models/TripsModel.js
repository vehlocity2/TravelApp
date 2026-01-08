const mongoose = require ('mongoose')
require('./ReviewsModel')

const tripsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    startDate: {type: Date, required: true},
    images: [String],
    numberOfGuests: { type: Number, required: true },
    overview: {
        duration: { type: String, required: true},
        groupSize: {type: String, required: true},
        language: {type: String, required: true},
        difficulty: {type: String, required: true},
    },
    duration: {type: Number, required: true},
    itinerary: [{
        title: { type: String, required: true},
        activities: { type: String, required: true}
    }],
    whatIncluded: [{type: String, required: true}],
    basePrice: { type: Number, required: true},
    tripRating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    location: { type: String, required: true},
    likeCount: { type: Number, required: true, default: 0},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    currentBooking: { type: Number, default: 0},
    status: { type: String, enum: ['upcoming', 'fully-booked', 'active', 'closed', 'open'], default: 'upcoming'}
},{timestamps: true})

tripsSchema.virtual('review', {
    ref: "Review",
    localField: "_id",
    foreignField: "trip"
})
tripsSchema.set("toObject",{ virtuals: true})
tripsSchema.set('toJSON', { virtuals: true})

tripsSchema.methods.getTripStartDate = function(){
    return new Date(this.startDate);
}

tripsSchema.methods.getTripEndDate = function(){
    const start = this.getTripStartDate()
    const end = new Date(start)
    end.setDate(start.getDate() + this.duration)
    return end
}
tripsSchema.methods.getBookingStartDate = function(){
    const start = new Date()
    start.setDate(1)
    return start
}
tripsSchema.methods.getBookingEndDate = function(){
    const start = this.getTripStartDate()
    const end = new Date(start)
    end.setDate(start.getDate() -2)
    return end
}
tripsSchema.methods.updateStatus = function () {
  const now = new Date()
  const tripStart = this.getTripStartDate()
  const tripEnd = this.getTripEndDate()

  const bookingStart = new Date(tripStart)
  bookingStart.setMonth(bookingStart.getMonth() - 1)

  const bookingEnd = new Date(tripStart)
  bookingEnd.setDate(tripStart.getDate() - 2)

  if (now < bookingStart) {
    this.status = 'upcoming'
  }
  else if (now >= bookingStart && now <= bookingEnd) {
    this.status = this.currentBooking >= this.numberOfGuests
      ? 'fully-booked'
      : 'open'
  }
  else if (now >= tripStart && now <= tripEnd) {
    this.status = 'active'
  }
  else {
    this.status = 'closed'
  }
}

const Trips = mongoose.model('Trips', tripsSchema)

module.exports = Trips


// localhost:5000/search?city=lagos

// // if(req.query.city == 'lagos') {
//     const places = await trip.find({location: req.query.city})
// // }