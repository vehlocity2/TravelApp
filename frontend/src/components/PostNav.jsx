import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const PostNav = ({onBack, onSubmitClick}) => {
  return (
    <nav className='md:px-5 md:py-5 px-3 py-3 border-gray-300 border-b-2'>
        <ul className='flex justify-between items-center md:gap-4'>
            <li className='flex justify-around gap-4 md:gap-6 items-center'>
                <FaArrowLeft className='text-2xl cursor-pointer' onClick={onBack}/>
                <p className='text-xl font-semibold'>Create post</p>
            </li>
            <li className='md:pr-6'>
                <button type='submit' className='bg-blue-600 px-3 py-1 cursor-pointer border-none font-semibold text-lg text-white rounded-xl' onClick={onSubmitClick}>Submit</button>
            </li>
        </ul>
    </nav>
  )
}

export default PostNav