import React, { useContext } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import MiniNav from '../components/MiniNav'
import { TripContext } from '../ContextApi/TripsContext'

const Trips = () => {
  const location = useLocation()
  const hideNav = location.pathname.includes('tour-details') || location.pathname.includes('book-tour') || location.pathname.includes('create-trips')
  const { loading } = useContext(TripContext)
  

  return (
    <div>
        {!loading && !hideNav && <MiniNav />}
        <Outlet />
    </div>
  )
}

export default Trips