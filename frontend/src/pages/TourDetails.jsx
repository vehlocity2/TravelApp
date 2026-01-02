// src/pages/TourDetails.jsx
import React, { act, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
// import trips from '../data/trips'
import trips from '../data/trips'
import { GoArrowLeft } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from 'axios';
import { FaPlaneDeparture } from 'react-icons/fa6';
import ReviewForm from '../components/ReviewComponents';


const TourDetails =  () => {
  const { tripId } = useParams()
  const [image, setImage] = useState('')
  const [product, setProduct] = useState(null)
  const [loading, setLoading]= useState(true)
  const [action, setAction] = useState('overview')
  const location = useLocation()

  const navigate = useNavigate()
  const handleBack = () => {
    const from = location.state?.from || '/trips'
    navigate(from)
  }


 const findProduct = async ()=> {
  const token = localStorage.getItem('token')
  // const trip = trips.find((trip)=> trip.id === tripId)
   await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/trips/trip/${tripId}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    setProduct(res.data.trip)
    setImage(res.data.trip.images[0])
    setLoading(false)
    console.log('a trip details', res.data.trip)
    console.log('tripId from useParams:', tripId);
    console.log('Received trip ID:', id);

  }).catch((err)=>{
    console.log('error in getting single trip', err.message)
    setLoading(false)
  })
}
    
 useEffect(()=>{
  findProduct()
 },[tripId])
  

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen  bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
        </p>
      </div>
    )
  }
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen  bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          Trip not found
        </p>
      </div>
    )
  }
  
  return (
    <div className='pt-2 pb-16 md:px-'>
      <div className="sticky top-0 bg-white px-3 md:px-8  py-2 shadow z-50 ">
        <div className="flex items-center justify-items-start gap-3">
          <GoArrowLeft className='text-4xl cursor-pointer pl-3' onClick={handleBack} />
          <h1 className='text-xl font-bold'>Tour Details</h1>
        </div>
      </div>
      <div className="px-4 flex flex-col md:flex-row items-start mt-4 gap-4 md:gap-8 ">
        <div className="w-full md:w-[45%] flex flex-col-reverse md:flex-row gap-6 shadow-2xl py-6 px-3 rounded-2xl items-center">
          <div className='flex flex-col gap-4 md:gap-6  md:w-1/4 '>
            <div className="flex flex-row md:flex-col overflow-x-auto gap-3">
              {product.images.map((img, index)=>(
                  <img key={index} src={`${import.meta.env.VITE_API_URL}/${img.replace(/\\/g, '/')}`} alt="" className='w-40 h-20 object-cover cursor-pointer' onClick={()=> setImage(img)}/>
              ))}
            </div>
          </div>
          <div className="flex flex-col relative w-full md:w-3/4 gap-4">
            <div className="w-full  h-72 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <img src={`${import.meta.env.VITE_API_URL}/${image.replace(/\\/g, '/')}`} alt="" className='w-full h-full object-cover cursor-pointer'/>
            </div>
            <div className="absolute bottom-16 left-4 bg-opacity-50 px-3 py-3">
              <h2 className='text-lg font-bold text-white mb-0'>{product.title}</h2>
              <p className="text-sm text-white">{product.startDate.slice(0,10)} — {product.location}</p>
            </div>
              <div className="flex items-center justify-between mt-4 px-4">
                <div className="">
                  <p className='text-lg font-bold text-green-600 mb-0'>${product.basePrice}</p>
                  <p className='text-xs -mt-1 text-gray-500'>per person</p>
                </div>
                <button className='bg-blue-500 text-white px-2 py-1 cursor-pointer transition duration-300 hover:bg-blue-700  rounded' onClick={()=>navigate(`/book-tour/${product.id}`)}>Book Now</button>
              </div>
          </div>
        </div>
        <div className="w-full md:w-[53%] -mt-4 md:py-6">
          <div className="flex gap-4 mb-4 bg-white py-3 justify-around items-end md:w-[90%] shadow rounded">
            <button  className={`text-sm  border-b-2 transition duration-300 cursor-pointer ${action === 'overview' ? 'border-blue-500 text-blue-600 ' : 'border-transparent'}`} onClick={() => setAction('overview')}>
              <h2 className='text-sm mt-6 '>Overview</h2>
            </button>
            <button  className={`text-sm  border-b-2 transition duration-300 cursor-pointer ${action === 'itinerary' ? 'border-blue-500 text-blue-600 ' : 'border-transparent'}`} onClick={() => setAction('itinerary')}>
              <h2 className='text-sm mt-6 '>Itinerary</h2>
            </button>
            <button  className={`text-sm  border-b-2 transition duration-300 cursor-pointer ${action === 'reviews' ? 'border-blue-500 text-blue-600 ' : 'border-transparent'}`} onClick={()=> setAction('reviews')}>
              <h2 className='text-sm mt-6 '>Reviews</h2>
            </button>
          </div>
          <div className="bg-white shadow w-full -mt-2 px-4 md:w-[90%] h-[370px] overflow-y-auto rounded">
            {action === 'overview' &&
            <div className='py-4 text-gray-500'>

              <h1 className='text-xl text-black font-medium'>Trip Information</h1>
              <div className='py-3'>
                  <div className='border border-gray-300 py-2 px-6 rounded-xl'>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                      <p>Duration</p>
                      <p className='text-black'>{product.overview.duration}</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                      <p>Group Size</p>
                      <p className='text-black'>{product.overview.groupSize}</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                      <p>Language</p>
                      <p className='text-black'>{product.overview.language}</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                      <p>Difficulty</p>
                      <p className='text-black'>{product.overview.difficulty}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 pb-4">
                      <p>Best Time</p>
                      <p className='text-black w-[50%] pr-0'>{product.overview.bestTime}</p>
                    </div>
                  </div>
              </div>

              <h1 className='text-xl text-black font-medium'>Description</h1>
              <div className='py-3'>
                <p className='leading-8'>{product.description}</p>
              </div>

              <h1 className='text-lg text-black font-medium py-2'>What's Included</h1>
              <ul className="list-decimal ml-5 space-y-2 grid grid-cols-2 ">
                {product.whatIncluded.map((point, index)=>(
                  <li key={index} className='flex items-start gap-2'>
                    <FaCheck className="text-green-500 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div> }
            {action === 'itinerary' && 
            <div className='py-2'>
              <ol className="list-decimal ml-5 space-y-3 divide-y divide-gray-300">
                {product.itinerary.map((point,index)=>(
                  <li key={index} className='flex items-start gap-4 '>
                    <div className="flex items-center justify-center min-w-[1.8rem] aspect-square rounded-full bg-blue-500 mb-2 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-gray-500">
                      <h1 className='text-base font-medium text-gray-800 '>{point.title}</h1>
                      <p className='text-sm'>{point.activities}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div> }
            {action === 'reviews' && 
            <div>
              <h2 className='text-lg text-gray-800 font-medium py-2'>Recent Reviews {product.review.length}</h2>
              <section className="flex flex-col justify-between gap-7">
                <ul className='text-sm bg-gray-200 p-4 rounded-xl text-gray-600'>
                  {product.review.length === 0 ? ( <p> No Reviews yet </p> ) :(product.review.map((point,index)=>{
                    const ratingValue = point.rating > 5 ? (point.rating / 100) * 5 : point.rating;
                    const fullStar = Math.floor(ratingValue);
                    const halfStar = ratingValue - fullStar >= 0.5;
                    const emptyStar = 5 - fullStar - (halfStar ? 1: 0)
                    console.log(point.rating, ratingValue, fullStar, halfStar, emptyStar);
                    return(
                      <div className='border-b border-gray-300 pb-4' key={index}>
                        <div className='flex items-center justify-between'>
                          <h2 className='text-gray-700 font-medium text-lg'>{point.user.name}</h2>
                          <div className="flex text-amber-300">
                            {Array.from({length:fullStar}).map(((_,i)=>(
                              <FaStar key={`full ${i}`} />
                            )))}
                            {halfStar && <FaStarHalfAlt key="half" />}
                            {Array.from({length:emptyStar}).map((_,i)=>(
                              <FaRegStar key={`empty ${i}`}/>
                            ))}
                          </div>
                        </div>
                        <p>{point.comment}</p>
                        <div className="flex justify-end items-center ">
                          <p className='text-sm'>{point.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                    )
                  }))}
                </ul>
                <ReviewForm tripId={tripId}/>
              </section>
            </div> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetails
