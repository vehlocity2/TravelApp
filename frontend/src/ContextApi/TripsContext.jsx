import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContextapi'

export const TripContext = createContext()

const TripsProvider = ({children}) => {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [tLoading, setTLoading] = useState(false)
    
    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (!token) return
        setLoading(true)
        const fetchTrips = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/trips/trips`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const sortTrip = res.data.trips.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
                setTrips(sortTrip)
                console.log('this are the trips', res.data.trips)
            } catch (err) {
                console.error('error in fetching trips', err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTrips()
    }, [token])

    const createTrip = async (formData)=>{
        setTLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/trips/admin/trips`,formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            
            setTLoading(false)
            // console.log(res.data)
            return res.data
        } catch (error) {
            console.error('error in creating post ', error.res.data)
            setTLoading(false)
        }
    }

    return (
        <TripContext.Provider value={{trips, loading, tLoading, createTrip, setTrips }}>
            {children}
        </TripContext.Provider>
    )
}

export default TripsProvider
