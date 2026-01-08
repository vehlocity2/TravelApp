import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";  // solid heart
import { AuthContext } from '../ContextApi/AuthContextapi';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from 'axios';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import DropdownMenu from './DropDownMenu';


const TripComponent = ({trips}) => {
    const { user } = useContext(AuthContext)
    const [likeCount, setLikeCount ] = useState(trips?.likeCount)
    const [ like, setLike ] = useState(trips.likedBy.includes(user.id))
    const [openMenu, setOpenMenu ] = useState(false)
    const location = useLocation()
    const admin = user.auths[0].isAdmin
    const navigate = useNavigate()

    const handleLike = ()=>{
        const token = localStorage.getItem('token')
        axios.patch(`${import.meta.env.VITE_API_URL}/api/v2/trips/trip/like/${trips?._id}`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setLike(res.data.likedBy.includes(user.id))
            setLikeCount(res.data.likeCount)
            console.log('likes data', res.data)
        }).catch((err)=>{
            console.error('error in getting likes', err.message)
        })
    }

  return (
     <div className=" w-full">
        <div className="shadow-lg bg-white  rounded-lg relative">
            <img src={trips.images[0]} alt="" className='w-full h-48 object-cover rounded'/>
            <div className='absolute top-0 right-0'>
                {admin && <HiOutlineDotsVertical className="text-xl bg-white px-0 mx-0 cursor-pointer " onClick={(e)=>{ e.stopPropagation(); setOpenMenu((prev) => !prev)}}/>}
                    <DropdownMenu
                        isOpen={openMenu}
                        onClose={() => setOpenMenu(false)}
                        options={[
                        { label: "Edit Post", onClick: () => navigate(`/edit-trips/${trips._id}`, { state: { from: location.pathname } }) },
                        { label: "Delete Post", onClick: () => console.log("delete") },
                        ]}
                    />
            </div>
            
            <div className="mx-4">
                <div className="flex justify-between items-center ">
                    <p className='text-xs bg-[#999292] rounded-3xl w-12 text-white text-center h-[20px] pt-[1px] my-4  '>{trips.duration} days</p>
                    <div className="flex items-center gap-1 text-green-500">
                        <IoMdCheckmarkCircleOutline className='text-sm' />
                        <p className='text-sm'>{trips.status.charAt(0).toUpperCase()+ trips.status.slice(1)}</p>
                    </div>
                </div>
                <h2 className="text-sm font-bold">{trips.title}</h2>
                <div className="flex items-center my-2 gap-2">
                    <IoLocationOutline className='text-xs'/>
                    <p className='text-xs'>{trips.location}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <CiCalendarDate className='text-xs'/>
                        <p className='text-xs'>{trips.startDate.slice(0, 10)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <BsPeople className='text-xs' />
                        <p className='text-xs'>{trips.numberOfGuests} people max</p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-2">
                    <div className="flex justify-between gap-4">
                        <div className="flex items-center gap-[2px] cursor-pointer" onClick={handleLike}>
                            {like ? (
                            <FaHeart
                                className="text-xl text-red-600 ml-1"
                            />
                            ) : (
                            <CiHeart
                                className="text-2xl text-blue-600"
                            />
                            )}
                            <p className="text-xs ml-1">{likeCount}</p>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                            <IoShareSocialOutline className='text-xs'/>
                            <p className='text-xs'>Share</p>
                        </div>
                    </div>
                    <Link to={`/trips/tour-details/${trips.id}`} state={{ from: location.pathname }}>
                        <button className="mt-2 px-2 py-1 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-3xl cursor-pointer">
                        View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TripComponent