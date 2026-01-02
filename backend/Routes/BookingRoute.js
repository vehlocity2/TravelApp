const express = require('express');
const verifyToken = require('../Middlewares/ValidateToken');
const { createBooking, getBookingsByTrip, getMyBookings, getSingleBooking, getHotelCity, getHotelDetail } = require('../Controller/BookingController');
const router = express.Router()

router.post('/bookings/:tx_ref',verifyToken, createBooking )
router.get('/bookings/trip/:tripId', verifyToken, getBookingsByTrip)
router.get('/bookings/me', verifyToken, getMyBookings)
router.get('/bookings/:id', verifyToken, getSingleBooking)
router.get('/hotels/:tripId', verifyToken, getHotelCity)
router.post('/hotel/:tripId/detail/:hotelApiId', verifyToken, getHotelDetail)


module.exports= router