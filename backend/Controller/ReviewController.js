const Review = require("../Models/ReviewsModel")
const Trips = require("../Models/TripsModel")

const createReview = async(req, res)=>{
    const { rating, comment } = req.body
    const userId = req.user.userId
    const { tripId } = req.params
    try {
            if(!rating || !comment){
            return res.status(404).json({message: " All fields are required"})
        }
        const trip = await Trips.findById(tripId)
        if(!trip){
            return res.status(404).json({message: " Trip not found "})
        }
        const existingReview = await Review.findOne({ user: userId, trip: tripId })
        if(existingReview){
            return res.status(400).json({ message: "You have already dropped a review for this trip."})
        }
        const review = new Review({
            user: userId,
            trip: tripId,
            rating,
            comment
        })
        await review.save()
        res.status(201).json({ message: " Review created successfully for this trip", review})
    } catch (error) {
        console.error("Error creating review:", error)
        res.status(500).json({message: " Internal server error "})
    }
}

const getAllReviews = async (req, res)=>{
    try {
        const reviews = await Review.find().populate('user', 'name').populate('trip', 'title')
        if(reviews.length === 0 ){
            return res.status(404).json({message: " No reviews found"})
        }
        res.status(200).json({message: " This is all the reviews", count: reviews.length, reviews})
    } catch (error) {
        console.error("Error fetching reviews:", error)
        res.status(500).json({message: " Internal server error "})
    }
}

const updateTripReview = async(req, res)=>{
    const { reviewId } = req.params
    const { rating, comment } = req.body
    try {
        const review = await Review.findOneAndUpdate({_id: reviewId}, {rating, comment }, {new: true })
        if(!review){
            return res.status(404).json({ message: "Review not found "})
        }
        if(review.user.toString() !== req.user.userId){
            return res.status(403).json({ message: "You are not authorized to update this review"})
        }
        res.status(200).json({ message: "Review updated successfully", review})
    } catch (error) {
        console.error("Error updating review:", error)
        res.status(500).json({message: " Internal server error "})
    }
}

const deleteTripReview = async(req, res)=>{
    const { reviewId } = req.params
    try {
        const review = await Review.findById(reviewId)
        if(!review){
            return res.status(404).json({ message: "Review not found "})
        }
        if(review.user.toString() !== req.user.userId){
            return res.status(403).json({ message: " You are not authorized to delete this review"})
        }
        await Review.findOneAndDelete({_id: reviewId})
        res.status(200).json({ message: "Review deleted successfully", review})
    } catch (error) {
        console.error("Error deleting review:", error)
        res.status(500).json({message: " Internal server error "})
    }
}

module.exports = {
    createReview,
    updateTripReview,
    deleteTripReview
}