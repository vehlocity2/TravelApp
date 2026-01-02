import axios from 'axios'
import { useContext, useEffect, useState } from 'react' // ✅ Add useEffect
import toast from 'react-hot-toast'
import { AuthContext } from '../ContextApi/AuthContextapi' // ✅ Import AuthContext

const UseHooks = ({user, loggedUser, onFollowUpdate}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const { setUser: setCurrentUser } = useContext(AuthContext) // ✅ Get setUser from context
  
  // ✅ Calculate isFollowing based on current props
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)

  // ✅ Update isFollowing whenever loggedUser or user changes
  useEffect(() => {
    if (loggedUser && user) {
      const following = Array.isArray(loggedUser?.following) && 
        loggedUser.following.some(f => {
          const followId = f._id || f.id || f
          return followId === (user._id || user.id)
        })
      setIsFollowing(following)
    }
  }, [loggedUser, user])

  const handleFollow = async () => {
    if (!user?._id) {
      toast.error('User information missing')
      return
    }

    const token = localStorage.getItem('token')
    setLoading(true)
    
    try {
      const res = await axios.patch(
        `${API_URL}/api/v2/users/user/${user._id}/following`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      // ✅ Update local state immediately
      setIsFollowing(res.data.isFollowing)
      toast.success(res.data.message || (res.data.isFollowing ? 'Followed successfully' : 'Unfollowed successfully'))
      
      // ✅ Call the parent callback to refresh data
      if (onFollowUpdate) {
        await onFollowUpdate()
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error in following user:', error.response?.data || error.message)
      setLoading(false)
      toast.error(error.response?.data?.message || 'Error in following user')
    }
  }

  return { isFollowing, handleFollow, loading }
}

export default UseHooks