import React, { useContext, useEffect, useState } from 'react'
import UserDashBoard from '../components/UserProfile'
import ProfileNav from '../components/Profilenav'
import { AuthContext } from '../ContextApi/AuthContextapi'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaPlaneDeparture } from 'react-icons/fa'

const Profile = () => {
  const { userId } = useParams()
  const { user, refreshUser } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const isEditing = location.pathname === "/profile/edit-profile"
  const [profileUser, setProfileUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const handleBack = () => {
        const from = location.state?.from || -1
        navigate(from)
    }

  const refetchProfileUser = async () => {
    console.log(' Refetching profile user...')
    
    // Always refresh logged-in user first
    if (refreshUser) {
      await refreshUser()
    }

    // If viewing another user's profile, also refresh their data
    if (userId) {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get(`${API_URL}/api/v2/users/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfileUser(res.data.user)
        console.log(' Profile user refreshed')
      } catch (err) {
        console.error('Error refetching profile:', err)
      }
    }
  }

  useEffect(() => {
    if (!userId) {
      // Viewing own profile
      setProfileUser(user)
      return
    }

    // Viewing another user's profile
    setLoading(true)
    const token = localStorage.getItem('token')

    axios.get(`${API_URL}/api/v2/users/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfileUser(res.data.user)
        setLoading(false)
        console.log('📥 Fetched profile user:', res.data.user)
      })
      .catch(err => {
        console.error(' Error fetching user:', err.response?.data || err.message)
        setLoading(false)
      })
  }, [userId, user]) //  Add user as dependency

  // If viewing another user's profile, wait until data is fetched
  if (userId && (loading || !profileUser)) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
        </p>
      </div>
    )
  }

  // Everything is ready to render
  const displayedUser = userId ? profileUser : user

  return (
    <div>
      <ProfileNav name={displayedUser?.name} post={displayedUser?.post} onBack={handleBack} />
      {isEditing ? (
        <Outlet />
      ) : (
        <UserDashBoard 
          user={displayedUser} 
          loggedUser={user} //  Pass the logged-in user
          onFollowUpdate={refetchProfileUser}
        />
      )}
    </div>
  )
}

export default Profile