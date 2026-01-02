import React from 'react'
import BookingUi from './BookingUi'
import { CiMoneyCheck1 } from "react-icons/ci";

const BookingPayment = ({ back, trip, handlePayment }) => {
    
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
            <div className='h-[2px] w-4 md:w-11 bg-blue-900'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-blue-900">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-blue-900 text-white'>3</span>
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

            <div className="mt-6 px-5 md:px-10 ">
                <h2 className='text-xl md:text-2xl font-bold'>Payment Methods</h2>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="flex items-center px-5 py-2 gap-2 border border-gray-300 hover:cursor-not-allowed rounded-lg ">
                        <CiMoneyCheck1 className='w-12 h-12 text-red-300' />
                        <div className="flex flex-col">
                            <h3 className='font-semibold'>Debit/Credit Card</h3>
                            <p className='text-sm font-medium'>Visa,MasterCard/Verve</p>
                        </div>
                    </div>
                    <div className="flex items-center px-5 py-2 gap-2 border border-gray-300 hover:cursor-not-allowed rounded-lg ">
                        <CiMoneyCheck1 className='w-12 h-12 text-blue-400' />
                        <div className="flex flex-col">
                            <h3 className='font-semibold'>PayPal</h3> 
                            <p className='text-sm font-medium'>Pay with your PayPal account</p>
                        </div>
                    </div>
                    <div className="flex items-center px-5 py-2 gap-2 border border-gray-300 hover:cursor-pointer rounded-lg " onClick={()=>handlePayment()}>
                        <CiMoneyCheck1 className='w-12 h-12 text-red-300' />
                        <div className="flex flex-col">
                            <h3 className='font-semibold'>Flutter Wave</h3>
                            <p className='text-sm font-medium'>Pay with flutterwave</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex ml-5 mb-4 md:ml-12 gap-2">
                <button className='px-6 py-2 border mt-4 border-blue-300 rounded-xl font-semibold hover:bg-blue-400 hover:text-white duration-300 transition-all cursor-pointer text-blue-500' onClick={()=>back()}>Back</button>
            </div>
        </div>
    </div>
  )
}

export default BookingPayment