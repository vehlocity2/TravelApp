import React, { useContext } from 'react'
import { AuthContext } from '../ContextApi/AuthContextapi'
import { Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import UserSignUp from '../pages/SignUP.JSX'

const ProtectedRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext)
        if (loading) {
            return (
            <div className="flex justify-center items-center h-screen bg-white">
                <p className="text-lg font-semibold animate-pulse text-gray-600">
                Loading your session...
                </p>
            </div>
            );
        }
    if(!user){
        return <Navigate to='/sign-up' replace />
    }
  return children
}

export default ProtectedRoutes