import React, { useContext, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import image1 from '../assets/big-ben1.jpg'
import axios from 'axios'
import { AuthContext } from '../ContextApi/AuthContextapi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaPlaneDeparture } from 'react-icons/fa'
import { PostContext } from '../ContextApi/PostContext'

const EditProfile = () => {
  const { user, token, setUser } = useContext(AuthContext)
  const { updatePostsAfterUserChange } = useContext(PostContext)
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [age, setAge] = useState('') 
  const [gender, setGender] = useState('')
  const [bio, setBio ] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    
    if(name.trim() !== "")formData.append('name', name)
    if(bio.trim() !== "")formData.append('bio', bio)
    if(gender.trim() !== "")formData.append('gender', gender)
    if(age.trim() !== "") formData.append('age', age)
    if(image){
      formData.append('image', image)
    }
    setLoading(true)
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v2/users/user/${user._id}`, formData,{
        headers:{
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      setLoading(false)
      console.log('success in updating profile')
      toast.success('Profile updated')
      console.log("this is the data updated ",res.data)
      setUser(res.data.user)
      updatePostsAfterUserChange(res.data.user)
      navigate(-1)
    } catch (error) {
      console.error("error in updating profile", error.message)
      toast.error('Error in updating profile')
    }
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
    <div className="max-w-[700px] mx-auto h-[100vh] px-4 py-6">
      <h1 className="font-bold text-xl mb-4">Edit Profile</h1>
    <form className="mt-2 w-full bg-white rounded-lg shadow-2xl shadow-black/20 z-50 py-2" onSubmit={handleSubmit}>
        <div className="w-full relative flex justify-center ">
            <img src={image1} alt="cover" className="w-full h-40 object-cover rounded-md"/>
            <label htmlFor="imageUpdate" className="absolute -bottom-8 left-6 h-28 w-28 border-2 border-dashed rounded-full overflow-hidden bg-gray-200 cursor-pointer flex items-center justify-center">
            {image && 
            (<img src={URL.createObjectURL(image)} className="absolute inset-0 w-full h-full object-cover"/>
            )}
            <IoAddCircle className="w-9 h-9 text-white z-40 drop-shadow-xl" />
            <input type="file" id="imageUpdate" className="hidden" accept="image/*" onChange={handleImageChange}/>
            </label>
        </div>
        <div className="mt-16 px-6">
            <label className="block">
                Name
                <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} className="border-b-2 p-2 w-full mt-1 outline-none rounded"/>
            </label>
        </div>
        <div className="flex justify-between items-center gap-2 mt-4 px-6">
            <div className="flex justify-around items-center gap-3">
              {/* <label className="block">
                  Age
                  <input type="Date" value={age} placeholder="Enter your Age" onChange={(e) => setAge(e.target.value)} className="border-b-2 p-2 w-20 mt-1 outline-none rounded"/>
              </label> */}
              <label >
                  <select value={gender} className="border-b-2 p-2 w-32 mt-1 outline-none bg-transparent" onChange={(e) => setGender(e.target.value)}>
                      <option value=''>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
              </label>
            </div>
            <label className="">
                Bio
                <input type="text" value={bio} placeholder="Enter your bio" onChange={(e) => setBio(e.target.value)} className="border-b-2 p-2 w-full outline-none mt-1 rounded"/>
            </label>
        </div>
        <button type='submit' className='ml-5 my-10 px-5 py-1 rounded-xl font-semibold bg-blue-500 cursor-pointer hover:bg-blue-600 text-white'>Submit</button>
    </form>
    </div>
  )
}

export default EditProfile
