import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { LuScanSearch } from "react-icons/lu";

const ProfileNav = ({name, post, onBack}) => {
  return (
    <div>
        <nav className='sticky top-0 bg-white px-3 md:px-8  py-2 shadow z-50 '>
            <ul className='flex justify-between items-center md:gap-4'>
               <li className='flex justify-around gap-4 md:gap-6 items-center'>
                    <FaArrowLeft className='text-2xl cursor-pointer' onClick={onBack}/>
                    <div className='hidden md:block'>
                        <h2 className='text-xl font-semibold '>{name}</h2>
                        <p className='text-xs  '>{post}post</p>
                    </div>
                </li>
                <li className='md:pr-6'>
                    <LuScanSearch className='text-2xl'/>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default ProfileNav