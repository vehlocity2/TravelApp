import React from 'react'
import BookingUi from './BookingUi'
import toast from 'react-hot-toast'

const BookingInfo = ({formData, setFormData, next, back, trip}) => {
    const handleNext = () =>{
        if(!formData.name ){
            toast.error("Names are required ")
            return
        }
        if(!formData.email){
            toast.error("Email is needed")
            return
        }
        if(!formData.phone){
            toast.error("Phone number is needed")
            return
        }
        next()  
    }
  return (
    <div>
        <div className="border-b-2 flex justify-center py-4 w-full mb-4 border-gray-300">
          <div className="flex items-center gap-1 md:gap-3 text-green-400">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-green-400 text-white '>1</span>
            <p>Details</p>
            <div className='h-[2px] w-4 md:w-11 bg-blue-900'></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 ml-3 text-blue-900">
            <span className='py-[1px] px-2 shrink-0 rounded-full bg-blue-900 text-white'>2</span>
            <p>Info</p>
            <div className='h-[2px] w-4 md:w-11 border-gray-500 border'></div>
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
            <div className="mt-6 px-4 md:px-10">
                <h2 className='text-xl md:text-2xl font-bold'>Tourist Information</h2>
                <div className="flex flex-col mt-3">
                    <label className='flex flex-col gap-2'>
                        <span className=' text-xl font-semibold'>Full Name</span>
                        <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Oshioke'/>
                    </label>
                </div>

                <div className="flex flex-col gap-3 mt-3 ">
                    <label className='flex flex-col gap-2'>
                        <span className=' text-xl font-semibold'>Email</span>
                        <input type="text" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Oshioke@gmail.com'/>
                    </label>
                    <label className='flex flex-col gap-2'>
                        <span className=' text-xl font-semibold'>Phone number</span>
                        <input type="text" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='+234.....'/>
                    </label>
                </div>

                <div className="mt-6 px-2  flex flex-col gap-2">
                    <h2 className='text-xl md:text-2xl font-bold'>Special Request ?</h2>
                    <p className='font-semibold'>Dietary Requirements, Accessibility needs, etc..</p>
                    <div className="ring-[1.2px] ring-gray-400 bg-white py-2 px-3 rounded-lg w-[93%] justify-between md:w-[55%] lg:w-[47%] flex items-center  gap-4 mt-3">
                        <textarea name="specialRequest" value={formData.specialRequest} onChange={(e)=> setFormData({ ...formData, specialRequest: e.target.value})} id="" rows={5} className='border-none h-auto outline-none w-full placeholder:text-gray-400 placeholder:text-xl' placeholder='Please let us know about any special requirement'/>
                    </div>
                </div>
            </div>
            
            <div className="flex ml-5 md:ml-12 gap-2">
                <button className='px-6 py-2 border mt-4 border-blue-300 rounded-xl font-semibold hover:bg-blue-400 hover:text-white duration-300 transition-all cursor-pointer text-blue-500' onClick={()=>back()}>Back</button>
                <button className='px-6 py-2 border mt-4 border-blue-300 rounded-xl font-semibold hover:bg-blue-400 hover:text-white duration-300 transition-all cursor-pointer text-blue-500' onClick={ handleNext}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default BookingInfo