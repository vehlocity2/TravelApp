import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContext } from '../ContextApi/PostContext'
import { AuthContext } from '../ContextApi/AuthContextapi'
import { FaPlaneDeparture, FaRegFileImage } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import ProfileNav from '../components/ProfileNav'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditPost = () => {
  const { user } = useContext(AuthContext)
  const [content, setContent] = useState('')
  const [images, setImages ] = useState([])
  const navigate = useNavigate()
  const { postId } = useParams()
  const { post, setPost } = useContext(PostContext)
  const currentPost = post.find(p => p._id === postId)
  const [loading, setLoading ] = useState(false)

  console.log('Editing post:', currentPost)

  const userImage = user.image ? user.image : image
  useEffect(()=>{
    if(currentPost){
      setContent(currentPost.content)
      setImages(currentPost.images || [])
    }
  }, [currentPost])

  const handleImage = (e)=>{
      const selected = Array.from(e.target.files)
      setImages((prev)=> [...prev, ...selected])
  }

  const removeImage = (indexToRemove)=>{
      setImages((prev)=> prev.filter((_,index)=> index !==indexToRemove ))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log('edited post submitted')
    const from = location.state?.from || '/'
    const formData = new FormData()
    formData.append('content', content)
    images.forEach((image)=>(
        formData.append('images', image)
    ))
    const token = localStorage.getItem('token')
    setLoading(true)
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v2/posts/post/${postId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res)=>{
      setLoading(false)
      console.log('Post updated successfully', res.data)
      toast.success('Post updated successfully')
      setPost(prevPosts => prevPosts.map(p => 
        p._id === postId ? res.data.post : p
      ));
      navigate(from)
    }).catch((err)=>{
      setLoading(false)
      console.error('Error updating post', err.message)
    })
  }
  
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
    <div className='py-3 md:px-8 px-2'> 
      <form onSubmit={(e)=> handleSubmit(e)} >
        <ProfileNav name={user.name} post={user.post} onBack={() => navigate(-1)} />
        <div className='flex items-center gap-4 mt-8 mb-6 justify-between px-2 '>
            <div className="flex items-start gap-4  justify-self-start">
              <img src={userImage} alt="" className='w-11 h-11 rounded-full'/>
              <h2 className='text-lg font-semibold'>{user.name}</h2>
            </div>
            <button type='submit' className='bg-blue-500 text-white px-6 py-[6px] rounded-2xl cursor-pointer'>Post</button>
        </div>
        <textarea rows='6' className='w-full border-none text-xl  px-3 py-2 focus:outline-none focus:border-blue-500 rounded-lg' value={content}  onChange={(e)=> setContent(e.target.value)}></textarea>
          {images.length > 0 && (
            <div className='mt-4 grid grid-cols-3 gap-2'>
                {images.map((image, index)=>(
                    <div className="relative" key={index}>
                        <img src={image} alt="" className='w-full object-cover h-44 rounded-lg'/>
                        <button onClick={()=>removeImage(index)} className='cursor-pointer absolute top-1 right-1 text-gray-200 rounded-full  text-lg '>
                            <TiDeleteOutline className='w-8 h-8'/>
                        </button>
                    </div>
                ))}
            </div>
        )}
        {images.length === 0 ? 
        (<div className='flex px-5 items-center border-t-2 border-b-2 gap-2 border-gray-300 py-3 mt-3'>
            <label htmlFor="postFile" className='flex items-center gap-2 cursor-pointer'>
                <FaRegFileImage className='w-6 h-6 text-green-500' />
                <p className='font-semibold text-xl'>Photos/videos</p>
            </label> 
            
        </div>) : 
            (<div className='mt-4 flex justify-self-auto items-center '>
                <label htmlFor="postFile">
                    <FaRegFileImage className='w-8 h-8 text-green-500 cursor-pointer' />
                </label>
            </div>)
        }
        <input type="file" id="postFile" className='hidden' onChange={handleImage} />
        </form>
    </div>
  )
}

export default EditPost