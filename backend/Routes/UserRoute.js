const express = require('express')
const { getAllUser, getOneUser, updateUser, deleteUser, getFollower, getFollowing, handleFollow } = require('../Controller/UserController')
const verifyToken = require('../Middlewares/ValidateToken')
const AdminProtect = require('../Middlewares/protectedUser')
const { profileUpload } = require('../multer/MulterImage')
const router = express.Router()




router.get('/user', verifyToken, AdminProtect,getAllUser)
router.get('/user/:id',verifyToken, getOneUser)
router.patch('/user/:id', verifyToken, profileUpload,updateUser)
router.delete('/user/:id', verifyToken, AdminProtect, deleteUser)
router.patch('/user/:id/follower', verifyToken, getFollower)
router.patch('/user/:id/following',verifyToken, handleFollow)

module.exports= router