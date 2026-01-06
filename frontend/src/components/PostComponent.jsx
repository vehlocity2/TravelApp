import React, { useContext, useEffect, useState } from 'react'
import image1 from '../assets/aaaa.jpg'
import { FaHeart } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FaRegComments } from "react-icons/fa6";
import axios from 'axios'
import { AuthContext } from '../ContextApi/AuthContextapi'
import image from '../assets/aaaa.jpg'
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast from 'react-hot-toast'
import DropdownMenu from './DropDownMenu'
import { useNavigate } from 'react-router-dom'

const PostComponent = ({ post }) => {
  const { user, token } = useContext(AuthContext)
  if(!user) return null 
  const userId = user?._id || user?.id
  console.log('this is post ', post)

  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [likesCount, setLikesCount] = useState(post?.likesCount)
  const [like, setLike] = useState(post?.likeBy.includes(userId))
  const [comments, setComments] = useState([])
  const [commentsCount, setCommentsCount] = useState(post?.comments?.length ?? 0)
  const [showComments, setShowComments] = useState(false)
  const [animateComments, setAnimateComments] = useState(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [openMenu, setOpenMenu] = useState(false);
  const [commentMenu, setCommentMenu] = useState(null)
  const navigate = useNavigate()

  const handleLike = () => {
    axios.patch(`${import.meta.env.VITE_API_URL}/api/v2/posts/post/${post?.id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      setLikesCount(res.data.count)
      setLike(res.data.likeBy.includes(userId))
    }).catch((err) => {
      console.error('Error liking post', err.response?.data?.message || err.message)
    })
  }

  useEffect(() => {
    if (user && post) {
      setLike(post.likeBy.includes(user._id))
    }
  }, [user, post])

  const handleImageClick = (i) => {
    setSelectedImage(i)
    setShowModal(true)
  }

  const fetchComments = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/v2/comments/post/${post?.id}/comments`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const newComments = res.data.comments.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
      setComments(newComments)
      setCommentsCount(res.data.count)
      setShowComments(true)
      console.log('comments', res.data.comments)
    }).catch((err) => {
      console.error('Error fetching comments', err.message)
    })
  }
  

  const toggleComments = () => {
    if (!showComments) {
      fetchComments()
      setShowComments(true)
      // Trigger animation after a brief delay to allow DOM to render
      setTimeout(() => setAnimateComments(true), 10)
    } else {
      setAnimateComments(false)
      // Wait for animation to finish before unmounting
      setTimeout(() => setShowComments(false), 300)
    }
  }

const handleSubmit = (e)=>{
  e.preventDefault()
  setLoading(true)
  axios.post(`${import.meta.env.VITE_API_URL}/api/v2/comments/post/${post?.id}/comment`,{content},{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
      setComments(prev=> [res.data.comment, ...prev])
      setCommentsCount(prev=> prev + 1)
      setContent('')
      setLoading(false)
      toast.success('Posted')
      console.log('my comment', res.data)
  }).catch((err)=>{
    console.error('Error in creating comment', err.response?.data?.message)
    toast.error(err.response?.data?.message)
  })
}


  const imageStyle = (count) => {
    if (count === 1) return 'w-full rounded-lg overflow-hidden'
    if (count === 2) return 'grid grid-cols-2 gap-2 rounded-lg overflow-hidden'
    if (count === 3) return 'grid grid-cols-3 gap-2 rounded-lg overflow-hidden custom-three-grid'
    if (count === 4) return 'grid grid-cols-2 grid-rows-2 gap-2 rounded-lg overflow-hidden'
    return 'flex flex-wrap gap-2 rounded-lg overflow-hidden'
  }
 const posterImage = post?.createdBy?.image ? post.createdBy.image : image
  return (
    <div className="relative w-full">
      {/* Post Content */}
      <div className="flex  flex-col  w-full px-3 pl-1 py-2">
        <div className="flex items-start gap-2 w-full ">
          <img
            src={posterImage}
            alt=""
            className="md:w-10 md:h-10 w-7 h-7 object-cover rounded-full cursor-pointer" onClick={()=> navigate(`/profile/${post.createdBy._id}`)}
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="md:text-lg text-base font-bold leading-tight">{post?.createdBy?.name}</p>
              <p className="md:text-sm text-xs text-gray-500 leading-tight">@{post?.createdBy?.auths?.[0]?.email}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p className="md:text-sm text-xs text-gray-500 whitespace-nowrap">{post?.createdAt?.slice(0,10)}</p>
              <div className="relative">
                <HiOutlineDotsVertical className="text-sm cursor-pointer" onClick={() => setOpenMenu(prev => !prev)}/>
                <DropdownMenu
                  isOpen={openMenu}
                  onClose={() => setOpenMenu(false)}
                  options={[
                    ...(post.createdBy._id === userId ? [{ label: "Edit Post", onClick: () => console.log("edit") },
                    { label: "Delete Post", onClick: () => console.log("delete") }] : []),
                    { label: "Share", onClick: () => console.log("share") },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm mt-2 md:ml-14 ml-9">{post?.content}</p>

        {post?.images?.length > 0 && (
          <div className={`${imageStyle(post.images.length)} px-5 py-2 mt-2 md:px-12 ml-4 w-full`}>
            {post.images.map((i, index) => (
              <img
                key={index}
                src={i}
                className={`w-full h-full object-cover rounded-md cursor-pointer ${
                  post.images.length === 3
                    ? index === 0
                      ? 'col-span-2 row-span-2 h-full'
                      : 'h-[50%]'
                    : ''
                }`}
                onClick={() => handleImageClick(i)}
              />
            ))}
          </div>
        )}

        {showModal && selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
            onClick={() => setShowModal(false)}
          >
            <img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start md:ml-14 ml-9 py-3 gap-3">
        <div className="flex items-center gap-[2px] px-2 cursor-pointer" onClick={handleLike}>
          {like ? (
            <FaHeart className="text-xl text-red-600 ml-1" />
          ) : (
            <CiHeart className="text-2xl text-blue-600" />
          )}
          <p className="text-sm pl-1">{likesCount}</p>
        </div>

        <div className="flex items-center gap-1 text-blue-500 cursor-pointer" onClick={toggleComments}>
          <FaRegComments className='text-2xl'/>
          <p className='text-xs'>{commentsCount}</p>
        </div>

        <div className="flex items-center gap-1 text-blue-500">
          <IoShareSocialOutline className='text-xs'/>
          <p className='text-xs'>Share</p>
        </div>
      </div>

      {showComments && (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 md:left-[5rem] lg:left-[15rem] md:right-[5rem] lg:right-[15rem] bg-black/50 z-40"
          onClick={() => setShowComments(false)}
        />
        
        {/* Comments Panel - Slides from bottom like Instagram */}
        <div
          className={`fixed bottom-0 left-0 right-0 md:left-[5rem] lg:left-[15rem] md:right-[5rem] lg:right-[15rem] bg-white rounded-t-2xl overflow-hidden px-4 z-50 transition-transform duration-300 ease-out h-[85vh] md:h-[60vh] lg:h-[75vh] ${animateComments ? 'translate-y-0' : 'translate-y-full'}`} 
          onClick={(e) => e.stopPropagation()}>
          {/* Drag handle indicator */}
          <div className="w-full flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="p-4 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b">
              <p className="font-bold text-lg">Comments</p>
              <button 
                onClick={() => setShowComments(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto -mx-4 px-4">
              {comments.length > 0 ? comments.map((c, idx) => (
                <div className="flex items-start gap-3 w-full border-b border-gray-100 py-3 " key={idx} >
                  <div className="flex-shrink-0 cursor-pointer" onClick={()=> navigate(`/profile/${c.createdBy._id}`)}>
                    <img src={c.createdBy?.image ? c.createdBy?.image : image1} alt="" className='rounded-full object-cover w-8 h-8' onClick={()=> navigate('/profile')}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm">{c.createdBy.name}</p>
                      {c.createdBy._id === userId && <div className="relative" >
                        <HiOutlineDotsVertical className="text-sm cursor-pointer" onClick={() => setCommentMenu(prev => prev === c._id ? null : c._id)}/>
                        <DropdownMenu 
                          isOpen={commentMenu === c._id}
                          onClose={() => setCommentMenu(false)}
                          options={[
                            { label: "Edit Post", onClick: () => console.log("edit") },
                            { label: "Delete Post", onClick: () => console.log("delete") }
                          ]}
                        />
                      </div>}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 break-words">{c.content}</p>
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-32">
                  <p className="text-gray-400 text-sm">No comments yet</p>
                  <p className="text-gray-400 text-xs mt-1">Be the first to comment!</p>
                </div>
              )}
            </div>

            {/* Comment Input - Fixed at bottom */}
            <div className="pt-3 border-t my-4">
              <div className="flex items-center mb-5 gap-2">
                <img 
                  src={user?.image || image1} 
                  alt="" 
                  className='rounded-full object-cover w-8 h-8' 
                />
                <form onSubmit={handleSubmit} className='w-full'>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="text-blue-500 font-semibold text-sm px-3" type='submit'>{loading? 'Posting...': 'Post'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default PostComponent
