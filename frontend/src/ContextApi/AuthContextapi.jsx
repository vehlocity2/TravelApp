import React, { Children, createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'


export const AuthContext = createContext()
const API_URL = import.meta.env.VITE_API_URL


const AuthContextProvider = ({ children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [token , setToken ]= useState(null)

  const SignUp = async (formData) =>{
    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/api/v2/auth/signup`, formData)
      setUser(res.data)
      setError(null)
      return res.data
    } catch (error) {
      console.log('Error during signup:', error)
      setError(error.response?.data?.message)
      return null
    }finally{
      setLoading(false)
    }
  }

  const SignIn = async(formData) =>{
    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/api/v2/auth/signin`, formData)
      const token = res.data.token
      setToken(token)
      localStorage.setItem('token', token)
      const userRes = await axios.get(`${API_URL}/api/v2/auth/me`,{
        headers:{ Authorization: `Bearer ${token}`}
      })
      setUser(userRes.data.user)
      setError(null)
      return userRes.data.user
    } catch (error) {
      console.log('Error during login:', error)
      setError(error.response?.data?.message)
      return null
    }finally{
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await axios.get(`${API_URL}/api/v2/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data.user)
      // console.log('Logged-in user refreshed')
    } catch (err) {
      console.error('Error refreshing user:', err)
    }
  }

  useEffect(()=>{
    const StoredToken = localStorage.getItem('token')
    if(StoredToken){
      setToken(StoredToken)
       axios.get(`${API_URL}/api/v2/auth/me`,{
        headers: {
          Authorization: `Bearer ${StoredToken}`
        }
      }).then((res)=>{
        // console.log('Fetched user:', res.data);
        setUser(res.data.user)
      }).catch((error)=>{
        console.log('Error fetching user data:', error)
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  }, [])

  // console.log('this is users:', user)

  const logOut = () =>{
    localStorage.removeItem('token')
    setUser(null)
  }
    
  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, refreshUser, SignUp, SignIn, logOut, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider