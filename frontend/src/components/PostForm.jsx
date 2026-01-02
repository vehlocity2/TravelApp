import React, { forwardRef, useContext, useState } from 'react'
import { PostContext } from '../ContextApi/PostContext'
import toast from 'react-hot-toast'
import { FaRegFileImage } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { FaPlaneDeparture } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContextapi';
import image from '../assets/big-ben.jpg'


const PostForm = forwardRef((props, ref) => {
    const { createPost, pLoading} = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const [content, setContent] = useState('')
    const [images, setImages ] = useState([])
    const navigate = useNavigate()

    const handleImage = (e)=>{
        const selected = Array.from(e.target.files)
        setImages((prev)=> [...prev, ...selected])
    }
    const removeImage = (indexToRemove)=>{
        setImages((prev)=> prev.filter((_,index)=> index !==indexToRemove ))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const from = location.state?.from || '/'
        const formData = new FormData()
        formData.append('content', content)
        images.forEach((image)=>(
            formData.append('images', image)
        ))
        try {
            await createPost(formData)
            toast.success('Post Created')
            navigate(from)
        } catch (error) {
            console.error('Error in creating post', error.message)
            toast.error('Post failed')
        }
    }
    const userImage = user.image ? `${import.meta.env.VITE_API_URL}/${user?.image.replace(/\\/g, '/')}` : image

    if(pLoading){
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
        <div className='flex items-start gap-4 mb-8 justify-self-start'>
            <img src={userImage} alt="" className='w-11 h-11 rounded-full'/>
            <h2 className='text-lg font-semibold'>{user.name}</h2>
        </div>
        <form ref={ref} onSubmit={handleSubmit}>
            <textarea rows='6' className='w-full border-none text-xl  px-3 py-2 focus:outline-none focus:border-blue-500 rounded-lg' value={content} placeholder="What's on your mind?" onChange={(e)=> setContent(e.target.value)}></textarea>
             { images.length > 0 && (
                <div className='mt-4 grid grid-cols-3 gap-2'>
                    {images.map((image, index)=>(
                        <div className="relative" key={index}>
                            <img src={URL.createObjectURL(image)} alt="" className='w-full object-cover h-44 rounded-lg'/>
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
})

export default PostForm