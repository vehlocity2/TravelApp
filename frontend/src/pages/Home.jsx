import React, { useContext } from 'react'
import PostComponent from '../components/PostComponent'
import { PostContext } from '../ContextApi/PostContext'
import { FaPlaneDeparture } from 'react-icons/fa'
import CreateTripForm from '../components/Unused'
import EditProfile from './EditProfile'

const Home = () => {
  const { post, loading } = useContext(PostContext)
  if(loading){
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          <FaPlaneDeparture className='text-blue-500 w-20 h-13' />
        </p>
      </div>
    )
  }
  return (
    <div>
      <div className="flex justify-center items-center py-2">
        <FaPlaneDeparture className='text-blue-500 w-10 h-10' />
      </div>
      {post.map((p)=>(
        <PostComponent key={p.id} post={p}/>
      ))}
      {/* <CreateTripForm /> */}
      {/* <EditProfile /> */}
    </div>
  )
}

export default Home