const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
const port = process.env.PORT 


app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use('/upload', express.static(path.join(__dirname, 'upload')));


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
}); 


const authRoute = require('./Routes/AuthRoute')
const adminRoute = require('./Routes/AdminRoute')
const usersRoute = require('./Routes/UserRoute')
const tripRoute = require('./Routes/TripsRoute')
const reviewRoute = require('./Routes/ReviewRoute')
const postRoute = require('./Routes/PostRoute')
const commentRoute = require('./Routes/CommentRoute')
const bookingRoute = require('./Routes/BookingRoute')
const transactionRoutes = require('./Routes/TransactionRoute')

app.use('/api/v2/auth', authRoute)
app.use('/api/v2/admin', adminRoute)
app.use('/api/v2/users', usersRoute)
app.use('/api/v2/posts', postRoute)
app.use('/api/v2/reviews', reviewRoute) 
app.use('/api/v2/trips', tripRoute)
app.use('/api/v2/comments', commentRoute)
app.use('/api/v2/bookings', bookingRoute)
app.use('/api/v2', transactionRoutes)
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
