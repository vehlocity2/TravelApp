const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { createReview, updateTripReview, deleteTripReview } = require('../Controller/ReviewController')
const router = express.Router()

router.post('/review/:tripId', verifyToken, createReview)
router.patch('/review/:reviewId', verifyToken, updateTripReview)
router.delete('/review/:reviewId', verifyToken, deleteTripReview)

module.exports = router