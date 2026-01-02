import React, { useRef } from 'react'
import PostNav from '../components/PostNav'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'

const CreatePost = () => {
    const formRef = useRef()
    const navigate = useNavigate()

    const handleSubmitFromNav = ()=>{
        if(formRef){
            formRef.current.requestSubmit()
        }
    }

    const handleBack =()=>{
        navigate(-1)
    }
  return (
    <div>
        <PostNav onBack={handleBack} onSubmitClick={handleSubmitFromNav}/>
        <PostForm ref={formRef} />
    </div>
  )
}

export default CreatePost