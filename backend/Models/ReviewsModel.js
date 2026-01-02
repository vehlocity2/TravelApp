const mongoose = require ('mongoose')

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trips", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true })    


const recalculateTripRating = async (tripId)=>{
    const Review = mongoose.model('Review')
    const Trips = mongoose.model('Trips')
    const stat = await Review.aggregate([
        { $match: {trip: tripId}},
        {
            $group: {
                _id: '$trip' , 
                avgRating: {$avg: '$rating'},
                count: { $sum: 1}
            }
        }
    ])
    if(stat.length > 0){
        await Trips.findByIdAndUpdate(tripId,{
            tripRating: stat[0].avgRating,
            reviews: stat[0].count
        })
    } else{
        await Trips.findByIdAndUpdate(tripId, {
            tripRating: 0,
            reviews: 0,
        })
    }
}

reviewSchema.post('save', async function () {
    await recalculateTripRating(this.trip)
})

reviewSchema.post('findOneAndUpdate', async function(doc){
    if(doc){
        await recalculateTripRating(doc.trip)
    }
})

reviewSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await recalculateTripRating(doc.trip)
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review