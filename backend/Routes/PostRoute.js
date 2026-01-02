const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { createPost, getAllPost, getOnePost, updatePost, deletePost, LikePost, getPostByUser } = require('../Controller/postController')
const { multipleUpload } = require('../multer/MulterImage')
const router = express.Router()


router.post('/post', verifyToken, multipleUpload, createPost)
router.get('/posts',  getAllPost)
router.get('/post/:postId', verifyToken, getOnePost)
router.put('/post/:postId', verifyToken, multipleUpload,updatePost)
router.delete('/post/:postId', verifyToken, deletePost)
router.patch('/post/:postId/like', verifyToken, LikePost)
router.get('/post/user/:userId', verifyToken, getPostByUser)

module.exports = router