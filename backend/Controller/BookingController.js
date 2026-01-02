const Booking = require("../Models/BookingModel")
const Trips = require("../Models/TripsModel")
const User = require("../Models/UserModel")
const { getHotelByCity, getHotelDetails } = require('../service/amadeusService')
const cityCodes = require('../dictionary/citiesCode')
const Transaction = require("../Models/TransactionModel")

const getHotelCity = async (req, res)=>{
    const { tripId } = req.params
    try {
        const trip = await Trips.findById(tripId)
        if(!trip) return res.status(404).json({message: "Trip not found"})
        function extractLocationKey(location) {
            if (!location) return null;
            let parts = location.toLowerCase().split(',').map(p => p.trim());
            if (parts[0]) return parts[0];
            return location.toLowerCase().trim();
        }
        
        const cleanCity = extractLocationKey(trip.location)
        const city = cityCodes[cleanCity]
        if (!city) {
            return res.status(400).json({ message: "City not supported or invalid" });
        }
        const hotels = await getHotelByCity(city)
        console.log("Hotels found:", hotels);
        if(!hotels || hotels.data.length === 0){
            return res.status(404).json({message: "No hotels found for this specified city"})
        }
        res.status(200).json({ hotels: hotels})
    } catch (error) {
        console.error("Error fetching hotels by city:", error.message)
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
}
const getHotelDetail = async (req,res) =>{
    const { tripId, hotelApiId } = req.params
    const { numberOfGuests } = req.body 
    try {
        const trip = await Trips.findById(tripId)
        if(!trip) return res.status(404).json({message: "Trip not found"})
        const startDate = trip.getTripStartDate()
        const endDate = trip.getTripEndDate()
        const hotelDetails = await getHotelDetails(hotelApiId, startDate, endDate, numberOfGuests)
        if(!hotelDetails){
            return res.status(404).json({message: "Hotel not available"})
        }
        const hotelOffer = hotelDetails.data[0];
        const hotelInfo = {
            hotelId: hotelApiId,
            name: hotelOffer.hotel.name,
            rating: hotelOffer.hotel.rating || 0,
            image: hotelOffer.hotel.media?.[0]?.uri || "https://via.placeholder.com/400",
            pricePerNight: parseFloat(hotelOffer.offers[0]?.price?.variations?.average?.base || hotelOffer.offers[0]?.price?.total || 0),
            totalPrice: parseFloat(hotelOffer.offers[0]?.price?.total || 0) 
        };
        res.status(200).json(hotelInfo)

    } catch (error) {
        console.error("Error fetching hotel details:", error.message)
        res.status(500).json({message: error.message})
    }
}

const createBooking = async (req, res)=>{
    try{
        const { tx_ref} = req.params
        const transaction = await Transaction.findOne({tx_ref, status: "successful"})
        if(!transaction){
            return res.status(400).json({message: "No successful transaction found for this reference"})
        }
        const existingBooking = await Booking.findOne({transactionId: transaction._id})
        if(existingBooking){
            return res.status(400).json({message: "Booking already exists for this transaction"})
        }
        const booking = new Booking({
            tripId: transaction.tripId,
            userId: transaction.userId,
            numberOfGuests: transaction.meta.numberOfGuests,
            specialRequest: transaction.meta.specialRequest,
            hotelApiId: transaction.meta.hotelApiId,
            totalPrice: transaction.amount,
            transactionId: transaction._id,
            bookingReference: "Bkg-" + Date.now()
        })
        await booking.save()
        return res.status(201).json({message: "Booking created successfully", booking})
    } catch (error) {
        console.error("Error creating booking:", error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await Booking.find({ userId }).populate("tripId");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
};

const getBookingsByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const bookings = await Booking.find({ tripId }).populate("userId", "name email");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

const getSingleBooking = async (req, res) => {
    const { id } = req.params
    try {
        const booking = await Booking.findById(id)
        .populate('tripId')
        .populate('userId', 'name');
        if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ booking });
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking", error: error.message });
    }
};

module.exports ={
    getHotelCity,
    getHotelDetail,
    createBooking,
    getMyBookings,
    getSingleBooking,
    getBookingsByTrip
}
