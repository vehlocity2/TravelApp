const Review = require("../Models/ReviewsModel")
const Trips = require("../Models/TripsModel")

const recalculateTripRating = async (tripId)=>{
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

// module.exports = recalculateTripRating