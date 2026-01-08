const citiesCode = require("../dictionary/citiesCode")
const Trips = require("../Models/TripsModel")
const { getHotelByCity, getHotelDetails } = require('../service/amadeusService')
const mongoose = require('mongoose')
const { uploadToCloudinary } = require("./config/Cloudinary")

const getHotel = async(req, res)=>{
    const { city} = req.params
    const lower = city.toLowerCase()
    const cityCode = citiesCode[lower] || city.toUpperCase()
    try {
        const hotel = await getHotelByCity(cityCode)
        if(!hotel || hotel.data.length === 0){
            return res.status(404).json({message: "No hotels found for this specified city"})
        }
        res.status(200).json({message: " Hotels fetched successfully", hotel: hotel.data})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getHotelDetail = async(req,res)=>{
    // const { hotelIds } = req.params
    const { hotelIds, checkInDate, checkOutDate, adults } = req.body
    try {
        if( !hotelIds || !checkInDate || !checkOutDate){
            return res.status(400).json({message: "All fields are required"})
        }
        const idsArray = Array.isArray(hotelIds) ? hotelIds : hotelIds.split(',').map(id => id.trim())
        // const idsArray = hotelIds.split(',')
        const hotelDetails = await Promise.all(idsArray.map(id => getHotelDetails(id, checkInDate, checkOutDate, adults)))
        res.status(200).json({message: "Hotel details fetched successfully", hotels: hotelDetails})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// const createTrip = async (req, res) => {
//     let { title, description, startDate, endDate, hotelApiId, overview, itinerary, whatIncluded } = req.body;
//     const imagePath = req.files ? req.files.map(file => file.path) : [];

//     try {
//         // Parse JSON fields if needed
//         if (typeof overview === "string") overview = JSON.parse(overview);
//         if (typeof itinerary === "string") itinerary = JSON.parse(itinerary);
//         if (typeof hotelApiId === "string") hotelApiId = JSON.parse(hotelApiId);

//         // Validate required fields
//         if (!title || !description || !startDate || !endDate || !overview || !itinerary || !hotelApiId || !whatIncluded || imagePath.length === 0) {
//             return res.status(400).json({ message: "All fields are required and at least one image is needed" });
//         }

//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         const now = new Date();
//         if (start < now) return res.status(400).json({ message: "Start date cannot be in the past" });
//         if (end < start) return res.status(400).json({ message: "End date is invalid" });

//         // Ensure hotelApiId is array
//         const idsArray = Array.isArray(hotelApiId) ? hotelApiId : hotelApiId.split(',').map(id => id.trim());

//         // Fetch hotel data
//         const hotelCheck = await Promise.all(idsArray.map(async id => {
//             try {
//                 const data = await getHotelDetails(id, startDate, endDate);
//                 if (!data?.data?.length) return { id, valid: false };
//                 return { id, valid: true, data };
//             } catch (err) {
//                 console.error(`Hotel fetch failed for ${id}`, err.message);
//                 return { id, valid: false };
//             }
//         }));

//         // Check invalid hotels
//         const invalidHotels = hotelCheck.filter(h => !h.valid);
//         if (invalidHotels.length > 0) {
//             return res.status(400).json({
//                 message: `One or more hotels have no available offers: ${invalidHotels.map(h => h.id).join(', ')}`
//             });
//         }

//         // Extract valid hotel data
//         const validHotelData = hotelCheck.map(h => h.data.data[0]);

//         // Extract trip info from first hotel for price, guests, and currency
//         const firstHotelOffer = validHotelData[0];
//         const offerPrice = firstHotelOffer.offers[0]?.price?.total || firstHotelOffer.offers[0]?.price?.variations?.average?.base || 0;
//         const price = parseFloat(offerPrice);
//         if (isNaN(price)) return res.status(400).json({ message: `Invalid hotel offer price for hotel ${hotelCheck[0].id}` });

//         const guest = firstHotelOffer.offers[0]?.guests?.adults || 1;
//         const currency = firstHotelOffer.offers[0]?.price?.currency || "USD";
//         const cityCode = firstHotelOffer.hotel?.cityCode || 'UNKNOWN';
//         const location = Object.keys(citiesCode).find(key => citiesCode[key] === cityCode) || cityCode;

//         // Build hotel info for trip
//         const tripHotelInfo = validHotelData.map(hotel => ({
//             name: hotel.hotel.name,
//             rating: hotel.hotel.rating || 0,
//             image: hotel.hotel.media?.[0]?.uri || "https://via.placeholder.com/400",
//             pricePerNight: parseFloat(hotel.offers[0]?.price?.variations?.average?.base || hotel.offers[0]?.price?.total || 0)
//         }));

//         // Add markup to price
//         const pricePercent = 20;
//         const actualPrice = price * (1 + pricePercent / 100);

//         // Create trip
//         const newTrip = await Trips.create({
//             title,
//             description,
//             startDate,
//             endDate,
//             images: imagePath,
//             overview,
//             itinerary,
//             createdBy: req.user.userId,
//             hotelApiId,
//             hotelInfo: tripHotelInfo,
//             price: actualPrice.toFixed(2),
//             currency,
//             numberOfGuests: guest,
//             location,
//             whatIncluded
//         });

//         res.status(201).json({
//             message: "Trip created successfully",
//             trip: newTrip
//         });

//     } catch (error) {
//         console.error("Error in createAdminTrip:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

const createAdminTrip = async (req, res) => {
    let { title, description,  overview, itinerary, whatIncluded, numberOfGuests, location, basePrice, duration, startDate } = req.body;
    const imagePath =  [];
    for( const file of req.files){
        imagePath.push( await uploadToCloudinary(file.buffer))
    }

    try {
        if (typeof overview === "string") overview = JSON.parse(overview);
        if (typeof itinerary === "string") itinerary = JSON.parse(itinerary);
        if(typeof whatIncluded === "string") whatIncluded = JSON.parse(whatIncluded)
        if (typeof hotelApiId === "string") hotelApiId = JSON.parse(hotelApiId);
        if (!title || !description || !overview || !itinerary || !whatIncluded || imagePath.length === 0 || !numberOfGuests || !location || !basePrice || !duration || !startDate) {
            return res.status(400).json({ message: "All fields are required and at least one image is needed" });
        }
        const newTrip = await Trips.create({
            title,
            description,
            images: imagePath,
            overview,
            itinerary,
            createdBy: req.user.userId,
            numberOfGuests,
            location,
            whatIncluded,
            basePrice,
            duration,
            startDate
        });
        res.status(201).json({
            message: "Trip created successfully",
            trip: newTrip
        });

    } catch (error) {
        console.error("Error in createAdminTrip:", error);
        res.status(500).json({ message: error.message });
    }
};


// const getTrips = async (req, res) => {
//     try {
//         const trips = await Trips.find().populate('review', 'rating comment user createdAt');
//         if (!trips.length) return res.status(404).json({ message: "No trips found" });

//         const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//         const today = new Date();
//         const allTrips = [];

//         for (const trip of trips) {
//             try {
//                 const isPast = new Date(trip.endDate) < today;
//                 if (isPast) {
//                     allTrips.push({ ...trip.toObject(), hotelOffer: null });
//                     continue;
//                 }

//                 const checkInDate = new Date(trip.startDate).toISOString().split('T')[0];
//                 const checkOutDate = new Date(trip.endDate).toISOString().split('T')[0];

//                 const hotelIds = Array.isArray(trip.hotelApiId) ? trip.hotelApiId : [trip.hotelApiId];
//                 const hotelOffers = [];

//                 for (const hotelId of hotelIds) {
//                     try {
//                         const hotelData = await getHotelDetails(hotelId, checkInDate, checkOutDate);
//                         if (!hotelData?.data?.length) continue;

//                         const offer = hotelData.data[0];
//                         hotelOffers.push({
//                             hotel: offer.hotel,
//                             offers: offer.offers,
//                             available: offer.available,
//                             self: offer.self
//                         });

//                         // For the trip summary, just take the first hotel's price & guests
//                         if (!trip.price) {
//                             const priceTotal = parseFloat(offer.offers[0]?.price?.total || offer.offers[0]?.price?.variations?.average?.base || 0);
//                             const pricePercent = 20;
//                             trip.price = (priceTotal * (1 + pricePercent / 100)).toFixed(2);
//                             trip.currency = offer.offers[0]?.price?.currency || "USD";
//                             trip.numberOfGuests = offer.offers[0]?.guests?.adults || 1;
//                             const city = offer.hotel?.cityCode;
//                             trip.location = Object.keys(citiesCode).find(key => citiesCode[key] === city) || city || "UNKNOWN";
//                         }
//                     } catch (hotelError) {
//                         console.error(`Error fetching hotel ${hotelId} for trip ${trip._id}:`, hotelError.message);
//                     }
//                     await delay(2000); // Throttle API calls
//                 }

//                 await trip.save();
//                 allTrips.push({ ...trip.toObject(), hotelOffer: hotelOffers });

//             } catch (error) {
//                 console.error(`Error processing trip ${trip._id}:`, error.message);
//                 allTrips.push({ ...trip.toObject(), hotelOffer: null, error: error.message });
//             }
//         }

//         res.status(200).json({
//             message: "Trips fetched successfully",
//             count: allTrips.length,
//             allTrips
//         });

//     } catch (error) {
//         console.error("Error in getAllTrips:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trips.find().populate('review', 'rating comment user createdAt');
        if (!trips.length) return res.status(404).json({ message: "No trips found" });
        res.status(200).json({
            message: "Trips fetched successfully",
            count: trips.length,
            trips
        });

    } catch (error) {
        console.error("Error in getAllTrips:", error);
        res.status(500).json({ message: error.message });
    }
};


// const getTripInfo = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid trip ID' });
//   }

//   try {
//     const trip = await Trips.findById(id).populate('review', 'rating user comment createdAt');
//     if (!trip) return res.status(404).json({ message: "Trip not found" });

//     let hotelOffers = [];
//     let dynamicPrice = null;
//     let currency = "USD";

//     // Only try fetching hotel offers if trip is upcoming
//     const today = new Date();
//     if (new Date(trip.endDate) >= today) {
//       const checkInDate = new Date(trip.startDate).toISOString().split('T')[0];
//       const checkOutDate = new Date(trip.endDate).toISOString().split('T')[0];
//       const idsArray = Array.isArray(trip.hotelApiId) ? trip.hotelApiId : [trip.hotelApiId];

//       for (const hotelId of idsArray) {
//         try {
//           const hotelData = await getHotelDetails(hotelId, checkInDate, checkOutDate);
//           if (!hotelData?.data?.length) continue;

//           const offer = hotelData.data[0];
//           hotelOffers.push(offer);

//           if (!dynamicPrice && offer.offers?.[0]?.price?.total) {
//             dynamicPrice = offer.offers[0].price.total;
//             currency = offer.offers[0].price.currency || "USD";
//           }
//         } catch (err) {
//           console.error(`Error fetching hotel ${hotelId}:`, err.message); // log the 429 error
//           continue; // skip to next hotel
//         }
//       }
//     }

//     res.status(200).json({
//       message: "Trip fetched successfully",
//       trip,
//       hotelOffer: hotelOffers.length ? hotelOffers : null,
//       price: dynamicPrice,
//       currency
//     });

//   } catch (error) {
//     console.error("Error in getTripInfo:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const getTripInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    const trip = await Trips.findById(id).populate({path: 'review', select: 'rating comment createdAt', populate:{path: 'user', select: 'name'}});
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json({
      message: "Trip fetched successfully",
      trip
    });

  } catch (error) {
    console.error("Error in getTripInfo:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserTrips = async(req, res)=>{
    const { userId } = req.params
    try {
        const trips = await Trips.find({createdBy: userId})
        if(!trips){
            return res.status(404).json({msg: "Trips not found or user need to create trips"})
        }
        res.status(200).json({msg: "trips fetched successfully", trips, count: trips.length})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateTrip = async (req, res)=>{
    const { id } = req.params
    try {
        const existingTrip = await Trips.findById(id)
        
        if(!existingTrip){
            return res.status(404).json({message: "Trip not found"})
        }
        let imagePath = existingTrip.images
        if(req.files && req.files.length > 0){
            imagePath = [];
            for ( const file of req.files){
                imagePath.push( await uploadToCloudinary(file.buffer))
            }
        }

        let overview = req.body.overview
        let itinerary = req.body.itinerary
        let whatIncluded = req.body.whatIncluded
        if(typeof overview === "string") overview = JSON.parse(overview);
        if(typeof itinerary === "string") itinerary = JSON.parse(itinerary);
        if(typeof whatIncluded === "string") whatIncluded = JSON.parse(whatIncluded);
        const trip = await Trips.findByIdAndUpdate(id, { ...req.body, overview, itinerary, whatIncluded, images: imagePath }, { new: true})
        if(!trip){
            return res.status(404).json({message: "trip not found"})
        }
        res.status(200).json({message: "Trip updated successfully", trip})
    } catch (error) {
        console.error("error in updating trip: ", error)
        res.status(500).json({message: error.message})
        
    }
}

const deleteTrip = async (req, res)=>{
    const { id } = req.params
    try {
        const trip = await Trips.findByIdAndDelete(id)
        if(!trip){
            return res.status(404).json({message: "Trip not found"})
        }
        res.status(200).json({message: "Trip deleted successfully ", trip})
    } catch (error) {
        console.error("Error in deleting trip:", error)
        res.status(500).json({message: error.message})
    }
}

const likeTrip = async (req, res)=>{
    const { id } = req.params
    const userId = req.user.userId
    console.log("User ID:", req.user?.userId);
    try {
        const trip = await Trips.findById(id)
        if(!trip){
            return res.status(404).json({message: "Trip not found"})
        }
        const isLiked = trip.likedBy.includes(userId)
        if(isLiked){
            trip.likedBy = trip.likedBy.filter(u => u.toString() !== userId)
            trip.likeCount = trip.likeCount - 1
            await trip.save()
            return res.status(200).json({message: "Trip unLiked successfully", likeCount: trip.likeCount, likedBy: trip.likedBy, trip})
        } else{
            trip.likedBy.push(userId)
            trip.likeCount = trip.likeCount + 1
            await trip.save()
            res.status(200).json({message: "Trip liked successfully", likeCount: trip.likeCount, likedBy: trip.likedBy, trip})
        }
        
    } catch (error) {
        console.error("Error in likeTrip:", error)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getHotel,
    getHotelDetail,
    createAdminTrip,
    getAllTrips,
    getTripInfo,
    updateTrip,
    deleteTrip,
    likeTrip,
    getUserTrips
}

// {
//     "duration":"5 days, 4 nights",
//     "groupSize":"Max 12 people",
//     "language":"English, French",
//     "difficulty":"Easy",
//     "bestTime":"Year-round"
// }