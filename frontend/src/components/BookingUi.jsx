import React from 'react'

const BookingUi = ({tripName, tripDuration, tripLanguage}) => {
  return (
    <div className='flex flex-col shadow-md border-l-8 border-blue-400 px-6 py-4 rounded-3xl '>
        <h2 className='text-2xl font-semibold mb-2'>{tripName}</h2>
        <div className="flex items-center gap-2">
            <p className='text-base text-gray-500'>{tripDuration}.</p>
            <p className='text-base text-gray-500'>{tripLanguage}</p>
        </div>
    </div>
  )
}

export default BookingUi