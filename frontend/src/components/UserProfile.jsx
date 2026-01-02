import React, { useEffect, useState } from 'react'
import image from '../assets/big-ben.jpg'
import image1 from '../assets/aaaa.jpg'
import { FaCalendarAlt, FaPlaneDeparture } from "react-icons/fa";
import { BiSolidBalloon } from "react-icons/bi";
import FollowComponent from './FollowComponent';
import { use } from 'react';
import axios from 'axios';
import PostComponent from './PostComponent';
import TripComponent from './TripComponent';
import DropdownMenu from './DropDownMenu';
import { useContext } from 'react';
import { AuthContext } from '../ContextApi/AuthContextapi';
import { useNavigate } from 'react-router-dom';
import UseHooks from '../Hooks/UseHooks';
const API_URL = import.meta.env.VITE_API_URL



const UserProfile = ({user, loggedUser, onFollowUpdate}) => {
  const { logOut, user:currentUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [showImage, setShowImage ] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isShrinking, setIsShrinking] = useState(false)
  const [selectedTab, setSelectedTab ] = useState(null)
  const [activeTab, setActiveTab ] = useState('posts')
  const [post, setPost ] = useState([])
  const [PLoading, setPLoading] = useState(false)
  const [trips, setTrips] = useState([])
  const[tLoading, setTLoading] = useState(false)
  const [showEditMenu, setShowEditMenu] = useState(false);

  const { isFollowing, loading: followingLoading, handleFollow } = UseHooks({user, loggedUser:currentUser, onFollowUpdate})
  

  const coverImage = image
  const profileImage = user?.image? `${import.meta.env.VITE_API_URL}/${user?.image.replace(/\\/g, '/')}` : image1;

  const handleLogout = ()=>{
    logOut()
    navigate('/sign-up')
  }
  const isOwner = currentUser && currentUser._id === user._id
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsShrinking(true)
      } else {
        setIsShrinking(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(()=>{
    if (!user) return
    const token = localStorage.getItem('token')
    setPLoading(true)
    setTLoading(true)

    axios.get(`${API_URL}/api/v2/posts/post/user/${user._id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setPost(res.data.posts)
      setPLoading(false)
      console.log("this is post", res.data.posts)
    }).catch((err)=>{
      console.error('Error in fetching post:',err.res?.data || err.message)
      setPLoading(false)
    })

    axios.get(`${API_URL}/api/v2/trips/trips/user/${user._id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setTrips(res.data.trips)
      setTLoading(false)
      console.log(res.data.trips)
    }).catch((err)=>{
      console.error('error in getting trips', err.message)
      setTLoading(false)
    })
  },[user])

  const usersToShow = selectedTab === 'follower'? user?.followers : selectedTab === 'following' ? user?.following : []

  const loading = !user || PLoading || tLoading

  if (loading) {
    return (
     <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
        </p>
      </div>
    )
  }
  return (
    <div className='flex flex-col max-w-[870px] w-full mx-auto overflow-x-hidden'>
      <div className="relative">
        <div className="w-full h-[140px] md:h-[170px] lg:h-[200px]  relative overflow-hidden rounded-lg">
          <img
            src={coverImage}
            alt="Profile"
            className='w-full h-full object-cover '
            onClick={()=>{setShowImage(true)
            setSelectedImage(coverImage)}}
          />
        </div>
        <div className="md:pl-6 sm:pl-3 px-4 flex items-center justify-between w-full md:mt-11 mt-7 absolute -bottom-20 h-[120px] transition-all duration-300">
          <img
            src={profileImage}
            alt=""
            className={`rounded-full cursor-pointer transition-all duration-300 origin-top-left
              ${isShrinking ? 'w-20 h-20 md:w-24 md:h-24' : 'w-28 h-28 md:w-36 md:h-36'}
            `}
            onClick={() => { setShowImage(true); setSelectedImage(profileImage); }}
          />

          {isOwner ? 
          (<div className="relative">
            <button 
              className="shrink-0 border border-gray-300 font-bold text-base px-3 py-1 rounded-2xl mt-2 hover:bg-amber-50 duration-300 cursor-pointer" onClick={() => setShowEditMenu(prev => !prev)}>
              Edit profile
            </button>

            <DropdownMenu
              isOpen={showEditMenu}
              onClose={() => setShowEditMenu(false)}
              options={[
                { label: "Edit Profile", onClick: () => navigate('/profile/edit-profile') },
                { label: "Settings", onClick: () => console.log("Settings") },
                { label: "Log out", onClick: () => handleLogout() }
              ]}
              className="absolute top-full right-0 mt-2 z-50"
            />
          </div>): (<div className="relative">
            <button 
              className={`shrink-0 font-bold text-base px-4 py-1 rounded-2xl mt-2 duration-300 cursor-pointer border transition-all min-w-[110px] ${followingLoading ? 'opacity-50 cursor-not-allowed' : ''} ${isFollowing ? 'border-gray-300 bg-white text-gray-800 hover:bg-red-50 hover:border-red-400 hover:text-red-600' : 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'}`} onClick={handleFollow}>
              {followingLoading ? '....' : isFollowing? 'Unfollow' : 'Follow'}
            </button>
          </div>)}

        </div>
      </div>
      <div className='md:px-6 px-5 pt-[80px] md:pt-[100px]'>
        <div className="">
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <p className="text-sm text-gray-600">@{user?.auths?.[0]?.email}</p>
        </div>
        <p className="text-sm text-gray-600">{user?.bio}</p>
        <div className="flex justify-between md:justify-items-normal items-center pt-4 gap-2">
          <div className="flex justify-between items-center gap-1">
            <FaCalendarAlt />
            <p className="text-sm text-gray-600">Joined {user?.createdAt.slice(0,10)}</p>
          </div>
          <div className="flex justify-between items-center gap-1 ">
            <BiSolidBalloon />
            <p className="text-sm text-gray-600">Born November {user?.age} 1997</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mt-3">
          <p className="text-sm  text-gray-600 cursor-pointer" onClick={()=>setSelectedTab('follower')}><span className='text-base font-semibold text-gray-800'>{user?.followersCount} </span>followers</p>   
          <p className="text-sm text-gray-600 cursor-pointer" onClick={()=>setSelectedTab('following')}><span className='text-base font-semibold text-gray-800'>{user?.followingCount} </span>following</p>   
        </div>
        <div className="flex border-b mt-3 border-gray-200">
          <button
            className={`px-2 py-2 text-xl text-gray-600 cursor-pointer ${activeTab === 'posts' ? 'border-b-2 border-blue-500 font-semibold text-xl' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`px-2 py-2 text-xl text-gray-600 cursor-pointer ${activeTab === 'trips' ? 'border-b-2 border-blue-500 font-semibold text-xl' : ''}`}
            onClick={() => setActiveTab('trips')}
          >
            Trips
          </button>
        </div>

        
      </div>

      {activeTab === 'posts' && (post.length === 0 ? (
        <p className='text-center text-gray-500 py-4'>no post yet </p>
      ): (
        post.map((p)=><PostComponent key={p.id} post={p}/>)
      ))}
      {selectedTab && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20 md:pt-24 px-4"
          onClick={() => setSelectedTab(null)} // clicking outside closes
        >
          <div
            className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-y-auto max-h-[70vh]"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">{selectedTab === 'follower' ? 'Followers' : 'Following'}</h3>
              <button className="text-gray-500 font-bold text-xl cursor-pointer" onClick={() => setSelectedTab(null)}>×</button>
            </div>

            <ul>
              {usersToShow.length === 0 ? (
                <p className="text-sm text-gray-500 py-2 px-4">No users found</p>
              ) : (
                usersToShow.map(u => (
                  <li key={u.id || u._id}>
                    <FollowComponent user={u} loggedUser={currentUser} onFollowUpdate={onFollowUpdate}/>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {showImage && (
        <div 
          className="fixed  inset-0 bg-black/70 flex justify-center items-center z-[200]"
          onClick={() => {setShowImage(false)
            setSelectedImage(null)
          }}>
          <img src={selectedImage} alt="" className="max-w-[90%] max-h-[80%] rounded-lg shadow-lg"/>
        </div>
      )}

        { activeTab === 'trips' && (trips.length === 0 ? ( <p className='text-center text-gray-500 py-4'>no post yet </p>
           ) : (
        <div className=" grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3  gap-5">
            {trips.map((trip)=><TripComponent key={trip._id} trips={trip} />)}
        </div>)
      )}
      
    </div>
  )
}

export default UserProfile
