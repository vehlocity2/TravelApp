import React, { useContext } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Trips from './pages/Trips'
import Profile from './pages/Profile'
import BookTour from './pages/BookTour'
import TourDetails from './pages/TourDetails'
import UpcomingTrips from './pages/UpcomingTrips'
import ProtectedRoutes from './protected/ProtectedRoutes'
import AuthContextProvider, { AuthContext } from './ContextApi/AuthContextapi'
import { Toaster } from 'react-hot-toast'
import TripsProvider from './ContextApi/TripsContext'
import PostContextProvider from './ContextApi/PostContext'
import CreateTrip from './pages/CreateTrip'
import CreatePost from './pages/CreatePost'
import EditProfile from './pages/EditProfile'
import BookingDone from './components/BookingDone'
import EditPost from './pages/EditPost'
import EditTrips from './pages/EditTrips'
import SignUp from './pages/SignUp'

// ✅ This component runs AFTER AuthContextProvider is mounted
const AppContent = () => {
  const { loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold animate-pulse text-gray-600">
          Loading your session...
        </p>
      </div>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="sign-up" element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path='edit-post/:postId' element={ <EditPost />} />
          <Route path='edit-trips/:tripId' element={ <EditTrips /> } />
          <Route path="trips" element={<Trips />} >
            <Route index element={<UpcomingTrips />} />
            {/* <Route path="upcoming-trips" element={<UpcomingTrips />} /> */}
            {/* <Route path="past-trips" element={<PastTrips />} /> */}
            <Route path='create-trips' element={<CreateTrip />} />
            <Route path="tour-details/:tripId" element={<TourDetails />} />
          </Route>
          <Route path='create-post' element={<CreatePost />} />
          <Route path="book-tour/:tripId" element={<BookTour />} >
            <Route path='done' element={ <BookingDone />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route path='edit-profile' element={ <EditProfile />} />
          </Route>
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

// ✅ This wraps the context around the entire app
const App = () => {
  return (
    <AuthContextProvider>
      <TripsProvider>
        <PostContextProvider>
          <AppContent />
        </PostContextProvider>
      </TripsProvider>
      <Toaster position="top-center" />
    </AuthContextProvider>
  )
}

export default App
