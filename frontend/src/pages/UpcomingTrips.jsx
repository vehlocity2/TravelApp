// src/pages/UpcomingTrips.jsx
import React, { useContext, useEffect, useState } from 'react'
import { CiCalendarDate } from "react-icons/ci";
import CalendarBar from '../components/Calendar';
import TripComponent from '../components/TripComponent';
import { FaPlaneDeparture } from 'react-icons/fa6';
import { TripContext } from '../ContextApi/TripsContext';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import MiniNav from '../components/MiniNav'

const UpcomingTrips = () => {
    const { trips, loading } = useContext(TripContext)
    const [showCalendar, setShowCalendar] = useState(false)
    const  [selectedDate, setSelectedDate] = useState(new Date())  
    
    const location = useLocation()
    const hideNav = location.pathname.includes('tour-details') || location.pathname.includes('book-tour')
    

    if(loading){
      return (
        <div className="flex justify-center items-center h-screen bg-white">
          <p className="text-lg font-semibold animate-pulse text-gray-600">
            <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
          </p>
        </div>
      )
    } 
    const fadeIn = "transition-all duration-300 ease-out";
    
  return (
    <div className="p-4" >
      <div className="flex flex-col md:flex-row relative">
          {/* Left side */}
          <div className="md:w-1/5 w-[80px] absolute -top-15 md:top-0 ">
              <div className=" mb-2 md:w-48 md:-mt-14">
                <CiCalendarDate
                  className="text-4xl mb-2  cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                />
              </div>
            <div className={`${showCalendar ? 'inline absolute top-8 -left-4 z-50 md:-top-5 bg-white shadow-lg rounded p-2 w-[22rem]' : 'hidden'} ${fadeIn}`}>
              <CalendarBar onDateChange={(date)=>{setSelectedDate(date); setShowCalendar(false)}} />
            </div>
          </div>
         
          {/* right side */}
          <div className=" w-full">
            {
              trips.length === 0 ? <p className='flex justify-center items-center text-3xl text-black h-[75vh] '>No trips for now</p> :
              <div className="space-y-4 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-5">
                {trips.map((trip)=><TripComponent key={trip._id} trips={trip} />)}
              </div> 
            }             
          </div>
      </div>
    </div>
  )
}

export default UpcomingTrips
