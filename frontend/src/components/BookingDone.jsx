import React from 'react'
import BookingUi from './BookingUi'
import { useParams, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { TripContext } from '../ContextApi/TripsContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FaPlaneDeparture } from 'react-icons/fa6'
import bookingImage from '../assets/booked.png'

const BookingDone = () => {
  const {tripId} = useParams()
  const { trips } = useContext(TripContext)
  const trip = trips.find((t)=> t._id.toString() === tripId)
  console.log("Trip in BookingDone:", trip)
  const [loading, setLoading] = useState(true)
  const [booking, setbooking ] = useState(null)
  const [searchParams] = useSearchParams()
  const paymentStatus = searchParams.get('status')
  const tx_ref = searchParams.get('tx_ref')

  useEffect(()=>{
    const fetchBooking = async()=>{
      if(!tx_ref &&  paymentStatus !== "successful") return setLoading(false)
      try {
        const token = localStorage.getItem('token')
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/bookings/bookings/${tx_ref}`, {},{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
          }
        })
        setbooking(res.data.booking)
        setLoading(false)
        console.log("Fetched booking:", res.data.booking)
      } catch (error) {
        console.error("Error fetching booking:", error.message)
        setLoading(false)
      }
    }
    fetchBooking()
  }, [tx_ref, paymentStatus])


  if(loading){
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
        </p>
      </div>
    )
  }
  if(!booking) return <p className='text-center mt-10'>No booking found.</p>


  const formatDate = (startDatestr, daysToAdd) =>{
    if (!startDatestr) return 
    const startDate = new Date(startDatestr)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + daysToAdd)

    const option = { month: "short", day: "numeric", year: "numeric"}
    const startFormatted = startDate.toLocaleDateString('en-US', option)
    const endFormatted = endDate.toLocaleDateString('en-US', option)
    return `${startFormatted} - ${endFormatted}`
  }

  return (
    <div>
        <div className="border-b-2 flex justify-center py-4 w-full mb-4 border-gray-300">
          <div className="flex items-center gap-1 md:gap-3 text-green-400">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-green-400 text-white '>1</span>
            <p>Details</p>
            <div className='h-[2px] w-4 md:w-11 bg-green-400'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-green-400">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-green-400 text-white'>2</span>
            <p>Info</p>
            <div className='h-[2px] w-4 md:w-11 bg-green-400'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-green-400">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-green-400 text-white'>3</span>
            <p>Payment</p>
            <div className='h-[2px] w-4 md:w-11 bg-blue-900'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-blue-900">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-blue-900 text-white'>4</span>
            <p>Done</p>
          </div>
        </div>
        <div className="bg-white shadow w-full py-4 mt-4 h-[100vh] md:max-h-[80vh] overflow-y-auto rounded">
            <div className="mx-4 md:mx-8">
                <BookingUi tripName={trip?.title} tripDuration={trip?.overview?.duration} tripLanguage={trip?.overview?.language}/>
            </div>
            <div className="flex flex-col gap-2 items-center mt-4">
              <img src={bookingImage} alt="booking image"  className='w-28 h-28'/>
              <h2 className='text-xl font-bold '>Booking Comfirmed!</h2>
              <p className='text-sm text-gray-500 w-[80%] text-center'>Your {trip?.title} Tour has been successful booked. you'll receive a confirmation email shortly with your itinerary and travel document</p>
              <div className="flex flex-col items-center justify-center px-5 py-2 md:w-64 w-80 bg-gray-200 rounded-2xl">
                <h5 className='text-xs text-gray-600'>Booking Reference</h5>
                <p className='font-semibold'>{booking?.bookingReference}</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-3 mt-2 px-4 py-2 border rounded-md w-[93%] md:w-[57%] lg:w-[47%] border-gray-300">
                <div className="flex justify-between w-full  items-center ">
                    <div className="flex gap-1 items-center">
                        <p className='text-base md:text-base text-gray-400'>Tour</p>   
                    </div>
                    <p className='text-gray-400'>{trip?.title}</p>
                </div>
                <div className="flex justify-between w-full  items-center ">
                    <div className="flex gap-1 items-center">
                        <p className='text-base md:text-base text-gray-400'>Dates</p>
                    </div>
                    <p className='text-gray-400'>{formatDate(trip?.startDate, trip?.duration)}</p>
                </div>
                <div className="flex justify-between w-full  items-center ">
                    <div className="flex gap-1 items-center">
                        <p className='text-base md:text-base text-gray-400'>Travelers</p>
                    </div>
                    <p className='text-gray-400'>{booking?.numberOfGuests} Adults </p>
                </div>
                <div className="flex justify-between w-full  py-2 border-t border-gray-300 items-center ">
                    <div className="flex gap-1 items-center">
                        <p className='text-base md:text-base text-gray-400'>Total Paid</p>
                    </div>
                    <p className='text-gray-400'>{booking?.totalPrice}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default BookingDone