import React, { use } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  const location = useLocation()
  const HideNav = location.pathname === '/sign-up' || location.pathname.includes('trips/tour-details')
  const showProfileBackNav = location.pathname === '/profile'

  return (
    <div className='flex md:min-h-screen '>
      <div className="block md:block md:w-[5rem] lg:w-[15rem] w-full fixed bg-white top-0 left-0 md:h-full z-50 transition-all duration-300 shadow-md">
        {!HideNav && <Navbar /> }
      </div>
      <div className="flex-1 md:ml-[4rem] lg:ml-[14rem] pb-5 md:mr-[5rem] lg:mr-[14rem] flex ">
        <div className="flex-1 p-3 px-4 pt-7 md:pt-0   border-r  bg-white border-gray-200">
          <Outlet /> 
        </div>
        <div className="hidden md:block md:w-[6rem] lg:w-[15rem] bg-white p-4 border-l fixed right-0 top-0  h-screen border-gray-200">
          <h2 className="text-lg font-semibold">Right Panel</h2>
          <p className="text-sm text-gray-600">Anything you want to place here.</p>
        </div>
      </div>
      
    </div>
  )
}

export default MainLayout