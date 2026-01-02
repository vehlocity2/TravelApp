import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IoAddCircle, IoHome } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { MdOutlineRemoveDone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPlaneDeparture } from "react-icons/fa6";
import { IoEarthOutline } from "react-icons/io5";
import { MdEmojiFlags } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import Bigben from '../assets/big-ben1.jpg'
import { CiSearch } from "react-icons/ci";


const Navbar = () => {
    const [value, setValue] = useState('')
    const [isInput, setIsInput] = useState(false)
    const location = useLocation()

    const hideLogo = [ '/create-post', '/trips']
    const showLogo = !hideLogo.includes(location.pathname)
    const hideNav = location.pathname.includes('/create-trips') || location.pathname.startsWith('/profile') || location.pathname.includes('/book-tour')

  return (
    <nav className=' md:px-6 pt-4  font-poppins'>
        <div className="md:flex md:flex-col items-start lg:pl-3 justify-start hidden">
            {/* {For desk Top screen } */}
            <Link to='/' className='flex items-center gap-3 text-3xl'>
                <FaPlaneDeparture className='text-blue-500' />
                <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent lg:block md:hidden">
                    TravelApp
                </h1>
            </Link>
            <ul className='flex flex-col gap-5 mt-8 justify-center items-start'>
                <NavLink to='/' className={({isActive})=>`flex items-center gap-3  ${isActive? 'text-blue-600' : 'text-gray-600'}`}>
                    <IoHome className='text-2xl'/>
                    <p className='text-lg lg:block md:hidden'>Post</p>
                </NavLink>
                <NavLink to='/search' className={({isActive})=>`flex items-center gap-2 ${isActive ? 'text-blue-400' : 'text-gray-700'}`} >
                    <CiSearch  className='text-3xl'/>
                    <p className='text-lg lg:block md:hidden'>Search</p>
                </NavLink>
                <NavLink to='/create-post' className={({isActive})=>`flex items-center gap-2 ${isActive ? 'text-blue-400' : 'text-gray-700'}`} >
                    <IoAddCircle className='w-8 h-8 '/>
                    <p className='text-lg lg:block md:hidden'>Post</p>
                </NavLink>
                <NavLink to='/trips' className={({isActive})=>`flex items-center gap-2 ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                    <MdOutlineRemoveDone className='text-2xl'/>
                    <p className='text-lg lg:block md:hidden'>Trips</p>
                </NavLink>
                <NavLink to='/notification' className={({isActive})=>`flex items-center gap-2 ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                    <IoMdNotificationsOutline className='text-3xl' />
                    <p className='text-lg lg:block md:hidden'>Notification</p>
                </NavLink>
                <NavLink to='/profile' className={({isActive})=>`flex items-center mt-52 gap-2 ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                    <CgProfile className='text-2xl'/>
                    <p className='text-lg lg:block md:hidden'>Profile</p>
                </NavLink>
                <NavLink className='ring-[1px] ring-gray-300 rounded-3xl flex px-2 gap-1 items-center text-sm py-1 w-36 lg:flex md:hidden'>
                    {value === "" && <MdEmojiFlags />}
                    <input type="text" placeholder='English' value={value} className='w-full outline-0 ' onChange={(e)=>setValue(e.target.value)}/>
                    { value=== '' &&  <IoEarthOutline  />}
                </NavLink>
            </ul>
        </div>
        {/* Mobile screen */}
        {!hideNav &&(<div className="md:hidden">
            {showLogo && (<div className='flex items-center justify-between py-4 px-4'>
                <Link to='/' className='flex items-center gap-2 text-2xl  '>
                    <FaPlaneDeparture className='text-blue-500 text-3xl' />
                    <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        TravelApp
                    </h1>
                </Link>
                <div className=' flex items-center gap-2 justify-center '>
                    <div className='ring-[1px] ring-gray-300 rounded-3xl flex px-2 gap-1 items-center text-sm py-1 w-28'>
                        {value === "" && <MdEmojiFlags />}
                        <input type="text" placeholder='English' value={value} className='w-full outline-0' onFocus={()=>setIsInput(true)} onBlur={()=>setIsInput(false)} onChange={(e)=>setValue(e.target.value)}/>
                        { value=== '' &&  <IoEarthOutline  />}
                    </div>
                    <IoMdNotificationsOutline className='text-xl' />
                    <Link to='/sign-up' className=''>
                        <img src={Bigben} alt=""  className='w-7 h-7 rounded-full'/>
                    </Link>
                </div>
            </div>)}
            { !isInput && (<ul className='flex  gap-10 bg-white py-3  justify-center items-center bottom-0 fixed right-0 left-0'>
                <NavLink to='/' className={({isActive})=>`flex flex-col items-center gap-1 text-lg  ${isActive? 'text-blue-600' : 'text-gray-600'}`}>
                    <IoHome />
                    <p>Post</p>
                </NavLink>
                <NavLink to='/search' className={({isActive})=>`flex flex-col items-center gap-1 ${isActive ? 'text-blue-400' : 'text-gray-700'}`} >
                    <FcSearch />
                    <p>Search</p>
                </NavLink>
                <NavLink to='/create-post' className={({isActive})=>`flex flex-col items-center gap-1 ${isActive ? 'text-blue-400' : 'text-gray-700'}`} >
                    <IoAddCircle className='w-7 h-7'/>
                    <p>Post</p>
                </NavLink>
                <NavLink to='/trips' className={({isActive})=>`flex flex-col items-center gap-1 ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                    <MdOutlineRemoveDone />
                    <p>Trips</p>
                </NavLink>
                <NavLink to='/profile' className={({isActive})=>`flex flex-col items-center gap-1 ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                    <CgProfile />
                    <p>Profile</p>
                </NavLink>
            </ul>)}
        </div>)}
    </nav>
  )
}

export default Navbar