import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { TripContext } from '../ContextApi/TripsContext';
import { AuthContext } from '../ContextApi/AuthContextapi';
import toast from 'react-hot-toast';

const ReviewForm = ({tripId}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false)
  const { token } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!rating || rating === 0){
        toast.error('Select a rating first')
        return
    }
    setLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/api/v2/reviews/review/${tripId}`, {rating:parseInt(rating), comment:review},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        setRating(0)
        setReview('')
        setLoading(false)
        toast.success("Review Submitted successfully")
        console.log(res.data)
    }).catch((err)=>{
        console.error('error in dropping a review', err.message)
        toast.error(err.response?.data?.message)
        setLoading(false)
    })    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-1">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                checked={rating === star}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="hidden" // Hide the actual radio button
              />
              <FaStar
                className={`text-lg ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label className="block text-sm font-medium mb-2">Review</label>
        <input
          type="text"
          placeholder="Drop a review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-[2px] focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled ={loading || !rating}
        className="bg-blue-500 text-white px-2 py-[2px] rounded hover:bg-blue-600"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ReviewForm;