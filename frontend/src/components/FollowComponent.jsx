import React from 'react'
import image1 from '../assets/aaaa.jpg'
import UseHooks from '../Hooks/UseHooks';
import { useNavigate } from 'react-router-dom';

const FollowComponent = ({user, loggedUser, onFollowUpdate}) => {
  const navigate = useNavigate()
  const profileImage = user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image.replace(/\\/g, '/')}` : image1;
  const { isFollowing, handleFollow, loading} = UseHooks({user, loggedUser, onFollowUpdate})
  const isOwner = loggedUser && loggedUser._id === user._id;
  const handleFollowButton = async (e)=>{

    await handleFollow();
  }

  const handleNavigateToProfile = () => {
    if (user?._id) {
      navigate(`/profile/${user._id}`)
    }
  }

  return (
    <div className='flex items-start gap-3 w-full  px-3 py-2' >
      <img
        src={profileImage}
        alt=""
        className='w-10 h-10 object-cover rounded-full'
      />
      <div className="flex justify-between items-start w-full">
        <div className='flex flex-col' onClick={handleNavigateToProfile}>
          <p className='text-lg font-bold leading-tight'>{user?.name}</p>
          <p className='text-sm text-gray-500 leading-tight'>@{user?.auths?.[0]?.email || "unknown"}</p>
          <p className='text-sm mt-1'>{user?.bio}</p>
        </div>
        {!isOwner && <button className={`px-4 py-1 font-medium rounded-3xl border transition-all duration-200 self-start cursor-pointer min-w-[100px] ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isFollowing ? 'bg-white border-gray-400 text-gray-800 hover:bg-red-50 hover:border-red-400 hover:text-red-600' :'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'}`} onClick={()=>handleFollowButton()} disabled={loading}>
          {loading? '....' : isFollowing? 'following' : 'follow'}
        </button>}
      </div>
    </div>
  )
}

export default FollowComponent
