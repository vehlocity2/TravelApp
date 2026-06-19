import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/AuthContextapi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const { user, SignUp, SignIn, loading, error} = useContext(AuthContext)
  const navigate = useNavigate()
  const [login, setLogin] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const user = await SignIn(formData)
    if(user){
    console.log('User logged in successfully')
        toast.success('Login successful!')
    navigate('/')
    } else{
    if (error) toast.error(error)
    }
  }
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center gap-5 md:gap-1 items-center  h-[80vh] mx-4 md:mx-7  my-10 ">
      <div className="w-full md:w-1/2 p-8  rounded-lg shadow-lg h-full flex flex-col justify-center py-4">
        {login === 'login' && (
          <>
            <h2 className="text-3xl font-semibold w-52 leading-6">Welcome to our travel app!</h2>
            <p className='text-sm my-4 text-gray-600'>Please sign in to your account</p>
          </>
        )}
        <form className='flex flex-col w-full ' onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border-b-2 border-gray-300 px-2 py-4 w-[95%] outline-none" placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border-b-2 border-gray-300 px-2 py-4 w-[95%] outline-none" placeholder="Password" />
          {login === 'login' && <div className="w-full md:w-[95%] flex flex-col justify-center items-center mt-3">
            <div className="flex w-full justify-between items-center my-4">
              <div className="flex items-center">
                <input type="checkbox" className='border-gray-300' />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <p className="text-sm text-blue-500 cursor-pointer mt-2">Forgot Password?</p>
            </div>
            <button type="submit" className="bg-gray-500 text-white  px-4 py-2 mt-3 w-full rounded-full hover:bg-gray-700 cursor-pointer duration-300 transition-all text-xl" onClick={() => setLogin('login')}> { loading? 'loading' : 'Login' }</button>
            <div className="flex justify-between gap-4 md:gap-6">
              <p className="mt-4 text-xs md:text-base ">New to our platform? </p>
              <p className="text-blue-500 cursor-pointer mt-4 text-xs md:text-base" onClick={() => navigate('/sign-up')}>Create an Account</p>
            </div>
          </div>}

          {error && (
            <div className="bg-red-100  text-red-700 px-4 py-3 rounded relative mb-4 animate-fadeIn" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </form>
      </div>


      <div className=" flex flex-col bg-black text-white w-full md:w-1/2 p-8 justify-center items-center h-full">
        <div className="">
            {login === 'login' && (
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl ">O</h1>
                <h2 className="text-3xl  font-semibold p-4">Welcome Back!</h2>
                <p className="p-4 text-center">
                  Log in to continue your journey — manage your trips, check your bookings, 
                  and discover new destinations waiting for you.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Login