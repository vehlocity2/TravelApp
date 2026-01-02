import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { LuScanSearch } from 'react-icons/lu'
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom'
import BookingUi from '../components/BookingUi'
import BookingDetail from '../components/BookingDetail'
import BookingInfo from '../components/BookingInfo'
import BookingPayment from '../components/BookingPayment'
import { useState } from 'react'
import { useContext } from 'react'
import { TripContext } from '../ContextApi/TripsContext'
import axios from 'axios'

const BookTour = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const isDone = useMatch('/book-tour/:tripId/done')

  const { tripId } = useParams()
  const { trips} = useContext(TripContext)
  const navigate = useNavigate()
  const [step, setStep ] = useState(1)
  const [formData, setFormData ] = useState({
    numberOfGuests: 1,
    hotelApiId: "",
    phone:"",
    name: "",
    email: "",
    specialRequest: ""
  })
  if (!trips) return <p>Loading trip details...</p>;
  const trip = trips.find((trip) => trip._id.toString() === tripId)

  const next = ()=>{
    setStep((prevStep) => prevStep + 1)
  }
  const back = () =>{
    setStep((prevStep) => prevStep - 1)
  }
  const handleBack = () => {
      const from = location.state?.from || -1
      navigate(from)
  }

  const handlePayment = () =>{
    const token = localStorage.getItem("token")
    if(!token) return 
      axios.post(`${API_URL}/api/v2/transaction/${tripId}`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }).then((res)=>{
        const paymentLink = res.data.paymentLink
        window.open(paymentLink, "_self")
      }).catch((err)=>{
        console.log("Payment initiation failed", err)
      })
    console.log("Payment initiated", formData)
  }
  return (
    <div>
      <nav className=' bg-white  md:px-8  py-2 shadow  '>
          <ul className='flex justify-between items-center md:gap-4'>
              <li className='flex justify-around gap-4 md:gap-6 items-center'>
                  <FaArrowLeft className='text-2xl cursor-pointer' onClick={handleBack}/>
                  <div className=''>
                      <h2 className='text-xl font-semibold '>Book Your Tour</h2>
                  </div>
              </li>
              <li className='md:pr-6'>
                  <LuScanSearch className='text-2xl'/>
              </li>
          </ul>
      </nav>

      
       {!isDone && (
        <>
          {step === 1 && <BookingDetail formData={formData} setFormData={setFormData} next={next} trip={trip}/>}
          {step === 2 && <BookingInfo formData={formData} setFormData={setFormData} next={next} trip={trip} back={back}/>}
          {step === 3 && <BookingPayment back={back} trip={trip} handlePayment={handlePayment}/>}
        </>
       )}

       <Outlet />
    </div>
  )
}

export default BookTour