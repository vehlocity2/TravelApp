const Auth = require("../Models/AuthModel")
const User = require("../Models/UserModel")
const bcrypt = require('bcrypt')

const getAllUser = async(req, res)=>{
    try {
        const users = await User.find()
        res.status(200).json({message: "this is all the user", count: users.length, users})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOneUser = async (req, res)=>{
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-__v')
            .populate('auths', 'email isAdmin')
            .populate({
                path: 'followers',
                select: 'name image bio auths',
                populate: { path: 'auths', select: 'email isAdmin' }   // ← extra populate
            })
            .populate({
                path: 'following',
                select: 'name image bio auths',
                populate: { path: 'auths', select: 'email isAdmin' }   // ← extra populate
            });
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        res.status(200).json({message: "this is the user", user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUser = async(req, res)=>{
    const { id } = req.params
    try {
        const { bio, name, password } = req.body
        const imagePath =  null;
        if (req.files && req.files.length > 0) {
            imagePath = await uploadToCloudinary(req.files[0].buffer);
        }
        const user = await User.findByIdAndUpdate(id, {bio, name}, {new: true})
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        if (imagePath) {
            user.image = imagePath
            await user.save()
        }
        if(password){
            const newPassword = await bcrypt.hash(password, 10)
            const updatePassword = await Auth.findOneAndUpdate({userId: id}, {password: newPassword}, {new: true})
            console.log(updatePassword)
            return res.status(201).json({message: "Password updated successfully"})
        }

        res.status(200).json({message: "user updated successfully", user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteUser = async(req, res)=>{
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const authUser = await Auth.findOneAndDelete({userId: id})
        if(!authUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(201).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getFollower = async(req, res)=>{
    const { id } = req.params
    const  userId  = req.user.userId
    try {
        const user =  await User.findById(id)
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        const isFollower = user.followers.includes(userId)
        if(isFollower){
            user.followers = user.followers.filter(uid => uid.toString() !== userId)
            user.followersCount = Math.max(0, user.followersCount - 1)
            await user.save()
            return res.status(200).json({message: "Unfollowed", followers: user.followers, count: user.followersCount, user})
        }else{
             user.followers.push(userId)
            user.followersCount = Math.max(0, user.followersCount + 1)
            await user.save()
            return res.status(200).json({message: "Followed", followers: user.followers, count: user.followersCount, user})
        }
    } catch (error) {
        console.error("error in getting follower", error)
        res.status(500).json({message: error.message})
    }
}

const handleFollow = async (req, res) => {
  const { id } = req.params
  const userId = req.user.userId

  try {
    const targetUser = await User.findById(id)
    const updateUser = await User.findById(userId)
    if (!targetUser) return res.status(404).json({ message: "User not found" })

    const isFollowing = updateUser.following.includes(targetUser._id)

    if (isFollowing) {
      // Unfollow using atomic updates
      await User.findByIdAndUpdate(userId, {
        $pull: { following: targetUser._id },
      })

      await User.findByIdAndUpdate(targetUser._id, {
        $pull: { followers: updateUser._id },
      })
    } else {
      // Follow using $addToSet to prevent duplicates
      await User.findByIdAndUpdate(userId, {
        $addToSet: { following: targetUser._id },
      })

      await User.findByIdAndUpdate(targetUser._id, {
        $addToSet: { followers: updateUser._id },
      })
    }

    const updatedTargetUser = await User.findById(id)
    const updatedUpdateUser = await User.findById(userId)

    updatedTargetUser.followersCount = updatedTargetUser.followers.length
    updatedUpdateUser.followingCount = updatedUpdateUser.following.length

    await updatedTargetUser.save();
    await updatedUpdateUser.save();

    res.status(200).json({
      message: isFollowing ? "Unfollowed" : "Following",
      targetUser: updatedTargetUser,
      updateUser: updatedUpdateUser,
      isFollowing: !isFollowing
    })
  } catch (error) {
    console.error("Error in handleFollow:", error)
    res.status(500).json({ message: error.message })
  }
}



module.exports ={
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser,
    getFollower,    
   handleFollow
}