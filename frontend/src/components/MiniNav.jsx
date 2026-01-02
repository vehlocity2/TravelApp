import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAddCircle } from "react-icons/io5";
import { AuthContext } from '../ContextApi/AuthContextapi';
import { FaPlaneDeparture } from 'react-icons/fa';

const MiniNav = () => {
  const { user } = useContext(AuthContext)
  console.log('this is the user role', user)
  return (
    <nav className="flex md:justify-end  justify-end gap-2 py-2  mx-2 px-2">
      <NavLink to='create-trips'  className={({isActive})=>  `  text-sm border-2 px-3 py-1 rounded-3xl flex items-center justify-between gap-2  bg-[#fbfbfb] ${isActive? 'border-blue-500 text-blue-500' : 'border-gray-300  text-gray-500'}`}>
          <IoAddCircle className='w-7 h-7'/>
          Trips
      </NavLink>    
    </nav>
  )
}

export default MiniNav