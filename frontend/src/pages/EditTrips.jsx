import React, { useContext, useEffect, useState } from 'react'
import { TripContext } from '../ContextApi/TripsContext'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaPlaneDeparture } from 'react-icons/fa';
import axios from 'axios';

const EditTrips = () => {
    const { trips, setTrips } = useContext(TripContext)
    const [title, setTitle ] = useState('')
    const [description, setDescription ] = useState('')
    const [itinerary, setItinerary ] = useState([{ title: '', activities: ""}])
    const [overview, setOverview ] = useState({ duration: '', groupSize: '', language: '', difficulty: ''})
    const [whatIncluded, setWhatIncluded ] = useState([''])
    const [numberOfGuests, setNumberOfGuests ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ basePrice, setBasePrice ] =  useState('')
    const [duration, setDuration ] = useState('')
    const [startDate, setStartDate ] = useState('')
    const [ images, setImages ] = useState([])
    const [loading, setLoading ] = useState(false)
    const { tripId } = useParams()
    const navigate = useNavigate()

    const currentTrip = trips.find((t)=> t._id === tripId)
    console.log('current trip', currentTrip)


    const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0]
    }
    useEffect(()=>{
        if(currentTrip){
            setTitle(currentTrip.title)
            setDescription(currentTrip.description)
            setItinerary(currentTrip.itinerary)
            setOverview(currentTrip.overview)
            setWhatIncluded(currentTrip.whatIncluded)
            setNumberOfGuests(currentTrip.numberOfGuests)
            setLocation(currentTrip.location)
            setBasePrice(currentTrip.basePrice)
            setDuration(currentTrip.duration)
            setStartDate(formatDateForInput(currentTrip.startDate))
            setImages(currentTrip.images)
        }
    }, [currentTrip])

    const handleOverviewChange = (field, value)=>{
        setOverview(prev=> ({...prev, [field]: value}))
    }
    const handleItineraryChange = (index, field, value)=>{
        setItinerary(prev => {
            const update = [...prev]
            update[index][field]= value
            return update
        })
        
    }
    const addItinerary = ()=>{
        setItinerary([...itinerary, {title: '', activities: ''}])
    }
    const removeItinerary = (index)=>{
        setItinerary(itinerary.filter((_,i)=> i !== index))
    }
    const handleWhatIncludedChange = (index, value)=>{
        const update = [...whatIncluded]
        update[index]= value
        setWhatIncluded(update)
    }
    const addWhatIncluded = () => {
        setWhatIncluded([...whatIncluded, ''])
    }
    const removeWhatIncluded = (index) =>{
        setWhatIncluded(whatIncluded.filter((_,i)=> i !== index))
    }
    const  handleSingleImageChange = (e,index)=>{
        const file = e.target.files[0];
        if (!file) return;

        setImages((prev) => {
            const newImages = [...prev];
            newImages[index] = file; 
            return newImages;
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const from = location.state?.from || '/trips'
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        const cleanItinerary = itinerary.map((item)=>({...item}))
        formData.append('itinerary', JSON.stringify(cleanItinerary))
        formData.append('overview', JSON.stringify(overview))
        formData.append('whatIncluded', JSON.stringify(whatIncluded.filter((item)=>item.trim() !== '')))
        formData.append('numberOfGuests', numberOfGuests)
        formData.append('location', location)
        formData.append('basePrice', basePrice)
        formData.append('duration', duration)
        formData.append('startDate', startDate)
        images.forEach((image)=>{
            formData.append('images', image)
        })
        const token = localStorage.getItem('token')
        setLoading(true)
        await axios.put(`${import.meta.env.VITE_API_URL}/api/v2/trips/admin/trip/${tripId}`, formData,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((res)=> {
            setLoading(false)
            console.log('trip updated successfully', res.data)
            toast.success('Trip created')
            navigate(from)
            setTrips(prev => prev.map(t => t._id === tripId ? res.data.trip : t))
        }).catch((err)=>{
            setLoading(false)
            console.error('Error in updating trip', err.message)
            toast.error('Failed creating trips')
        })
        
    }
    const handleBack = () => {
        const from = location.state?.from || '/trips'
        navigate(from)
    }
    if(loading){
          return (
            <div className="flex justify-center items-center h-screen bg-white">
              <p className="text-lg font-semibold animate-pulse text-gray-600">
                <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
              </p>
            </div>
          )
        } 

  return (
    <form onSubmit={handleSubmit} className='mx-4 '>
        <div className="py-4 flex justify-between items-center">
            <AiOutlineClose type='button' className='w-8 h-8 cursor-pointer' onClick={
                (e)=> {e.stopPropagation(); 
                handleBack()}}
            />
            <button type='submit' className='px-4 py-[2px] bg-blue-500 rounded-2xl hover:bg-blue-700 cursor-pointer duration-300 transition-all text-white '>Post</button>
        </div>
        
        <h2 className='font-semibold text-xl '>Basic Information</h2>
        <div className="w-full flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <label
                key={i}
                htmlFor={`imageUpload${i}`}
                className="flex-1 md:h-40 h-28 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer hover:border-blue-500"
                >
                {images[i] ? (
                    <img
                    src={URL.createObjectURL(images[i])}
                    alt={`upload-${i}`}
                    className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <span className="text-gray-400 text-lg text-center">+ Add Image</span>
                )}
                <input
                    id={`imageUpload${i}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleSingleImageChange(e, i)}
                />
                </label>
            ))}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300  px-3 rounded-xl py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Base Price *</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
                <label className="block text-sm font-medium mb-2">Duration*</label>
                <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Max Guests *</label>
                <input
                type="number"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Start Date *</label>
                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Overview</h2>

        <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                type="text"
                value={overview.duration}
                onChange={(e) => handleOverviewChange('duration', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Group Size</label>
                <input
                type="text"
                value={overview.groupSize}
                onChange={(e) => handleOverviewChange('groupSize', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <input
                type="text"
                value={overview.language}
                onChange={(e) => handleOverviewChange('language', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                value={overview.difficulty}
                onChange={(e) => handleOverviewChange('difficulty', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
                </select>
            </div>
        </div>
      </div>
      <div className="bg-white py-6 px-3 rounded-lg shadow space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">What's Included</h2>
          <button
            type="button"
            onClick={addWhatIncluded}
            className="text-green-500"
          >
            <IoMdCheckmark className='w-8 h-8 cursor-pointer' />
          </button>
        </div>

        {whatIncluded.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleWhatIncludedChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {whatIncluded.length > 1 && (
              <button
                type="button"
                onClick={() => removeWhatIncluded(index)}
                className="text-red-500"
              >
               <MdOutlineDeleteForever className='w-6 h-6 cursor-pointer' />
              </button>
            )}
          </div>
        ))}
       
      </div>
       <div className="bg-white py-6 px-3 rounded-lg shadow space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Itinerary</h2>
                <button
                    type="button"
                    onClick={addItinerary}
                    className="text-green-500 "
                >
                <IoMdCheckmark className='w-8 h-8 cursor-pointer' />
                </button>
            </div>
            {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            value={day.title}
                            onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />

                        <input
                            value={day.activities}
                            onChange={(e) => handleItineraryChange(dayIndex, 'activities', e.target.value)}
                            rows="2"
                            className="w-full border border-gray-300 rounded px-3 ml-1 py-2 focus:outline-none focus:border-blue-500"
                        />
                        {itinerary.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeItinerary(dayIndex)}
                                className="text-red-500"
                                >
                            <MdOutlineDeleteForever className='w-6 h-6 cursor-pointer' />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </form>
  ) 
}

export default EditTrips