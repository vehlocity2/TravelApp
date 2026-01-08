const Transaction = require("../Models/TransactionModel")
const Trips = require("../Models/TripsModel")
const { getHotelByCity, getHotelDetails } = require('../service/amadeusService')
const axios = require('axios')


const createTransaction = async(req, res)=>{
    const { phone,  numberOfGuests, hotelApiId, name, email, specialRequest } = req.body
    const { tripId } = req.params
    const userId = req.user.userId
    try {
        const trip = await Trips.findById(tripId)
        if(!trip){
            return res.status(404).json({ message: " Trip not found "})
        }
        trip.updateStatus()
        await trip.save()
        if(!phone || !numberOfGuests || !name || !email ){
            return res.status(400).json({ message: " All fields are required "})
        }

        const now = Date.now()
        const bookingStart = trip.getBookingStartDate()
        const bookingEnd = trip.getBookingEndDate()
        if(now < bookingStart) return res.json({message: "Booking has not yet opened"})
        if(now > bookingEnd) return res.json({message: "Booking is closed"})
        
        if(trip.currentBooking + numberOfGuests > trip.numberOfGuests){
            trip.status = 'fully-booked'
            await trip.save()
            return res.status(404).json({message: "Trip is fully booked"})
        }
        
        if (!hotelApiId || typeof hotelApiId !== 'string') {
            return res.status(400).json({ message: "Hotel selection is required" });
        }
        console.log("Hotel id from the body :", hotelApiId);

        const startDate = trip.getTripStartDate()
        const endDate = trip.getTripEndDate()

        const hotelDetails = await getHotelDetails(hotelApiId, startDate, endDate, numberOfGuests)
        if(!hotelDetails){
            return res.status(404).json({message: "Hotel not available"})
        }
        const hotelOffer = hotelDetails.data[0]
        
        const bookingPrice = hotelOffer.offers[0]?.price?.total || hotelOffer.offers[0]?.price?.variations?.average?.base || 0;
        const hotelPrice = parseInt(bookingPrice) 
        const tripPrice = trip.basePrice * numberOfGuests
        const tripServiceFee = tripPrice * 10 / 100
        const totalPrice = hotelPrice + tripPrice + tripServiceFee
        const tx_ref = 'MC-' + Date.now();
        const response = await axios.post('https://api.flutterwave.com/v3/payments',{
            tx_ref,
            amount: totalPrice,
            tripId,
            userId,
            currency: "NGN",
            redirect_url: `https://travelapp-qohq.onrender.com/book-tour/${tripId}/done`,
            customer: {email, name, phonenumber: phone},
            customizations: {
                title: "Travel Tour",
                description: "Payment for tour",
                logo: ""
            },
            meta:{
                numberOfGuests,
                specialRequest,
                hotelApiId,
                tripPrice,
                hotelPrice,
            }            
        },{
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const transaction = await Transaction.create({
        tx_ref,
        amount: totalPrice,
        currency: "NGN",
        email,
        name,
        phone,
        payment_link: response.data.data.link,
        payment_response: response.data,
        status: "pending",
        meta:{
            specialRequest,
            hotelApiId,
            tripPrice,
            numberOfGuests,
            hotelPrice,
        },
        tripId,
        userId
        
    })
    res.status(200).json({
        message: "Transaction initiated",
        amount:totalPrice,
        currency: "NGN",
        tx_ref,
        paymentLink: response.data.data.link,
        transaction
    })

    }catch(error){
        console.error("Transaction Error:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const webHookHandler = async (req, res)=>{
    try {
        console.log("🔥🔥 FLUTTERWAVE WEBHOOK HIT 🔥🔥");
        console.log("HEADERS:", req.headers);
        console.log("BODY:", req.body);

        const signature = req.headers['verif-hash']
        if(signature !== process.env.FLW_WEBHOOK_HASH){
            return res.status(401).json({message: "invalid signature"})
        }
        console.log("Incoming hash:", signature);
        console.log("Expected hash:", process.env.FLW_WEBHOOK_HASH);

        const { status, txRef,  } = req.body
        const transaction_id = req.body.id
        console.log("🔔 Webhook event:", transaction_id);
        console.log("🔔 Webhook tx_ref:", txRef)

        if(status === "successful"){
            const verifyRes = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,{
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("Verification response:", verifyRes.data);
            const payment = await Transaction.findOne({tx_ref: txRef})
            if(verifyRes.data.data.status === "successful" && payment && payment.amount === parseFloat(verifyRes.data.data.amount) && payment.currency === verifyRes.data.data.currency){
                payment.status = "successful"
                payment.payment_response = verifyRes.data
                await payment.save()
                return res.sendStatus(200)
            } else if(verifyRes.data.data.status === "failed" && payment ){
                payment.status = "failed"
                payment.payment_response = verifyRes.data
                await payment.save()
                return res.sendStatus(200)
            }
        } else{
            const payment = await Transaction.findOneAndUpdate({tx_ref:data.tx_ref}, {status: "failed", payment_response: req.body}, {new: true})
            return res.status(200).json({message: "Unhandled event type, marked as failed", payment})
        }
    } catch (error) {
        console.error("webHook Error:", error.message)
        return res.status(500).json({ message: "Server Error", error: error.message})
    }
}


module.exports = {
    createTransaction,
    webHookHandler
}