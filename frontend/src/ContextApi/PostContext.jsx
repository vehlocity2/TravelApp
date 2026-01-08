import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContextapi'
import axios from 'axios'


export const PostContext = createContext()

const PostContextProvider= ({children}) => {
    const { token } = useContext(AuthContext)
    const [post, setPost ] = useState([])
    const [loading, setLoading] = useState(false)
    const [pLoading, setPLoading ] = useState(false)

    useEffect(()=>{
        setLoading(true)
        const fetchPost = async()=>{
            await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/posts/posts`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                const sortPost = res.data.posts.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
                setPost(sortPost)
                setLoading(false)
                // console.log('this is all the post n the data base', res.data.posts)
            }).catch((err)=>{
                setLoading(false)
                console.error('Error in fetching posts', err.response.data.message)
            })
        }
        fetchPost()

    }, [token])
    const createPost = async (formData) =>{
        setPLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/posts/post`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })
             setPost(prev => [res.data.post, ...prev]);
            setPLoading(false)
            // console.log('Post created successfully', res.data)
        } catch (error) {
            setPLoading(false)
            console.error('Error in creating post', error.message)
        }
    }

    const updatePostsAfterUserChange = (updatedUser) => {
    setPost(prevPosts => prevPosts.map(p => 
        p.createdBy._id === updatedUser._id
        ? { ...p, createdBy: updatedUser }
        : p
    ));
    };


  return (
    <PostContext.Provider value={{loading, post, createPost, pLoading, updatePostsAfterUserChange, setPost}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
