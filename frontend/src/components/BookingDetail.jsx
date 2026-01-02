import React from 'react'
import BookingUi from './BookingUi'
import { FaCalendarCheck } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaPlaneDeparture } from 'react-icons/fa6';
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect } from 'react';

const BookingDetail = ({formData, setFormData, next, trip}) => {
    const [hotel, setHotel ] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showHotels, setShowHotels] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState(null)
    const [hotelDetails, setHotelDetails ] = useState(null)
    const [hotelDetailsLoading, setHotelDetailsLoading ] = useState(false)

    console.log("booking trip details:" ,trip)
    const handleNext = () =>{
        if(!formData.numberOfGuests){
            toast.error("number of guests is required")
            return
        }
        if(!formData.hotelApiId){
            toast.error("Select a hotel")
            return
        }
        next()
        console.log("Booking detail form data:", formData)
    }
    const startDate = new Date(trip?.startDate)
    const duration = trip?.duration
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + duration)


    const getHotel = async ()=>{
        const token = localStorage.getItem('token')
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/bookings/hotels/${trip._id}`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setHotel(res.data.hotels)
            setLoading(false)
        }).catch((err)=>{
            console.error("Error fetching hotels:", err.message)
            setLoading(false)
        })
    }
    console.log("Selected hotel:", hotel)

    useEffect(()=>{
        if(!selectedHotel) return 
        const fetchHotelDetails = async() =>{
            const token = localStorage.getItem('token')
            setHotelDetailsLoading(true)
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/bookings/hotel/${trip._id}/detail/${selectedHotel.hotelId}`,{
                numberOfGuests: formData.numberOfGuests
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                setHotelDetails(res.data)
                setHotelDetailsLoading(false)
                console.log("selected hotel details:", res.data )
            }).catch((err)=>{
                console.error("Error in getting hotels details:", err.message)
            })
        }
        fetchHotelDetails()
    },[selectedHotel])
    
  return (
    <div>
         <div className="border-b-2 flex justify-center py-4 w-full  mb-4 border-gray-300">
          <div className="flex items-center gap-1 md:gap-3 text-blue-900">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-blue-900 text-white '>1</span>
            <p>Details</p>
            <div className='h-[2px] w-4 md:w-11 border-gray-500 border'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-gray-600">
            <span className='py-[1px] px-2 shrink-0 rounded-full border-gray-500 border '>2</span>
            <p>Info</p>
            <div className='h-[2px] w-4 md:w-11 bg-gray-500'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-gray-600">
            <span className='py-[1px] px-2 shrink-0 rounded-full border-gray-500 border  '>3</span>
            <p>Payment</p>
            <div className='h-[2px] w-4 md:w-11 bg-gray-500'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-gray-600">
            <span className='py-[1px] px-2 shrink-0 rounded-full border-gray-500 border  '>4</span>
            <p>Done</p>
          </div>
        </div>

        <div className="bg-white shadow w-full py-4 mt-4 h-[100vh] md:max-h-[80vh] overflow-y-auto rounded">
            <div className="mx-4 md:mx-8">
                <BookingUi tripName={trip?.title} tripDuration={trip?.overview?.duration} tripLanguage={trip?.overview?.language}/>
            </div>
            <div className="flex flex-col gap-4 mt-4 px-4 md:px-8 py-3 md:py-6">
                <h2 className='text-2xl font-bold'>See Travel Date </h2>
                <div className="border border-gray-300 bg-blue-100 px-4 py-2 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-self-auto gap-2">
                        <FaCalendarCheck className='w-6 h-6  text-red-300' />
                        <h3 className='text-xl md:text-2xl font-semibold text-blue-500'>Flexible tour dates </h3>
                    </div>
                    <p className='text-sm text-blue-500'>Tours are all round year every months</p>
                </div>
                <div className="flex items-center justify-start gap-4 px-4">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className='text-sm md:text-lg font-bold'>Departure</p>
                        <div className='px-4 py-3 rounded-2xl border border-gray-300'>{startDate.toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-center">
                        <p className='text-sm md:text-lg font-bold'>Return</p>
                        <div className='px-4 py-3 rounded-2xl border border-gray-300'>{endDate.toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-4 md:px-10">
                <h2 className='text-xl md:text-2xl font-bold'>Number of travelers</h2>
                <div className="flex items-center justify-between mt-2 px-4 md:px-8 py-2 border-t border-b border-gray-300">
                    <h2 className='text-lg md:text-xl font-semibold'>Tourist</h2>
                    <div className="flex justify-between gap-2 items-center">
                        <button className='px-5 cursor-pointer py-2 border border-gray-300 rounded-lg' onClick={(e)=> setFormData({...formData, numberOfGuests: Math.max(1, formData.numberOfGuests - 1)})}>-</button>
                        <span className='font-bold'>{formData.numberOfGuests}</span>
                        <button className='px-5 cursor-pointer py-2 border border-gray-300 rounded-lg' onClick={(e)=> setFormData({...formData, numberOfGuests: formData.numberOfGuests + 1})} >+</button>
                    </div>
                </div>
            </div>
            {showHotels && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-1/3 max-h-[80vh] overflow-y-auto p-4 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Available Hotels</h2>
                    {loading ? (
                        <div className="flex justify-center items-center  bg-white">
                            <p className="text-lg font-semibold animate-pulse text-gray-600">
                                <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
                            </p>
                        </div>
                    ) : (
                        hotel?.data?.map((h) => (
                        <div key={h.hotelId} className="p-3 border-b border-gray-300 flex justify-between items-center hover:cursor-pointer hover:shadow-md" onClick={() => {
                            setFormData({...formData, hotelApiId: h.hotelId})
                            setSelectedHotel(h)
                            setShowHotels(false)}}>
                            <div>
                                <h3 className="font-semibold">{h.name}</h3>
                                <p className="text-sm text-gray-500">{h.address.cityName}, {h.address.countryCode}</p>
                            </div>
                            <button className=" text-green-500 cursor-pointer">
                                <FaCircleCheck className='w-6 h-6' />
                            </button>
                        </div>
                        ))
                    )}
                    <button className="mt-4 px-4 py-2 border rounded" onClick={() => setShowHotels(false)}>Close</button>
                    </div>
                </div>
                )}
                {selectedHotel && (
                <div className="mt-4 mx-4 md:mx-10 p-4 border-2 border-blue-300 rounded-xl bg-blue-50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-semibold mt-2">{selectedHotel.name}</h2>
                            <div className="flex flex-col ">
                                <div className=" flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-600 mt-1">
                                        {selectedHotel.address.lines?.join(', ')}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">Rating: {hotelDetails?.rating}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-600">
                                        {selectedHotel.address.cityName}, {selectedHotel.address.countryCode}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1"> Price per night: {hotelDetails?.pricePerNight}</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            className="text-red-500 hover:text-red-700 font-semibold"
                            onClick={() => {
                                setSelectedHotel(null)
                                setFormData({...formData, hotelApiId: null})
                            }}
                        >
                            <IoIosRemoveCircle className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            )}
            <button className='px-6 py-2 border mt-4 border-blue-300 rounded-xl font-semibold mx-10 hover:bg-blue-400 hover:text-white duration-300 transition-all cursor-pointer text-blue-500' onClick={() => { getHotel(); setShowHotels(true); }}>{selectedHotel ? 'Change Hotel' : 'Select Hotel'}</button>

            {hotelDetailsLoading && (
                <div className="flex justify-center items-center mt-6 bg-white">
                    <p className="text-lg font-semibold animate-pulse text-gray-600">
                        <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
                    </p>
                </div>
            )}
            {hotelDetails && (<div className="mt-6 px-4 md:px-10 mb-4">
                <h2 className='text-xl md:text-2xl font-bold'>Price Breakdown </h2>
                <div className="flex flex-col items-center justify-between gap-3 mt-2 px-4 py-2 border rounded-md w-[93%] md:w-[57%] lg:w-[47%] border-gray-300">
                    <div className="flex justify-between w-full  items-center ">
                        <div className="flex gap-1 items-center">
                            <p className='text-base md:text-base text-gray-400'>Tourist</p>
                            <p className='text-gray-400'>({formData.numberOfGuests } x { trip?.basePrice})</p>
                        </div>
                        <p className='text-gray-400'>{formData.numberOfGuests *  trip?.basePrice}</p>
                    </div>
                    <div className="flex justify-between w-full  items-center ">
                        <div className="flex gap-1 items-center">
                            <p className='text-base md:text-base text-gray-400'>Hotel Price</p>
                            <p className='text-gray-400'>({formData.numberOfGuests } x {hotelDetails?.totalPrice})</p>
                        </div>
                        <p className='text-gray-400'>{formData.numberOfGuests *  hotelDetails?.totalPrice}</p>
                    </div>
                    <div className="flex justify-between w-full  items-center ">
                        <div className="flex gap-1 items-center">
                            <p className='text-base md:text-base text-gray-400'>Fee & Tax</p>
                        </div>
                        <p className='text-gray-400'>{formData.numberOfGuests *  trip?.basePrice * 10 / 100} </p>
                    </div>
                    <div className="flex justify-between w-full  py-2 border-t border-gray-300 items-center ">
                        <div className="flex gap-1 items-center">
                            <p className='text-base md:text-base text-gray-400'>Total</p>
                        </div>
                        <p className='text-gray-400'>{(formData.numberOfGuests *  trip?.basePrice * 10 / 100) + (formData.numberOfGuests *  trip?.basePrice ) + (formData.numberOfGuests * hotelDetails?.totalPrice)} </p>
                    </div>
                </div>
            </div>)}
            <button className='px-6 py-2 border mt-4 border-blue-300 rounded-xl font-semibold mx-auto ml-6 md:ml-10 hover:bg-blue-400 hover:text-white duration-300 transition-all cursor-pointer text-blue-500' onClick={ handleNext}>Continue</button>
        </div>
    </div>
  )
}

export default BookingDetail