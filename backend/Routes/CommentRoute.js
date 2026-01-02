const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { createComment, getCommentsByPostId, updateComment, deleteComment } = require('../Controller/CommentController')
const router = express.Router()

router.post('/post/:postId/comment', verifyToken, createComment)
router.get('/post/:postId/comments', verifyToken, getCommentsByPostId)
router.patch('/comment/:commentId', verifyToken, updateComment)
router.delete('/comment/:commentId', verifyToken, deleteComment)

module.exports = router