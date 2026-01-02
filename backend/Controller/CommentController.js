const Comment = require("../Models/CommentModel")
const Post = require("../Models/PostModel")

const createComment = async (req, res)=>{
    const { content } = req.body
    const { postId } = req.params
    const userId = req.user.userId
    try {
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ message: " Post not found"})
        }
        if(!content){
            return res.status(400).json({ message: " comment content is required"})
        }
        const comment = new Comment({
            postId,
            createdBy: userId,
            content
        })
        await comment.save()
        res.status(201).json({ message: " comment created successfully", comment})
    } catch (error) {
        console.error('Error creating comment:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

getCommentsByPostId = async (req, res)=>{
    const { postId } = req.params
    try {
        const comments = await Comment.find({ postId }).populate('createdBy', 'name image _id')
        if(!comments || comments.length === 0 ){
            return res.status(404).json({ message: " No comments found for this post"})
        }
        res.status(200).json({ message: " comments retrieved successfully", comments , count: comments.length})
    } catch (error) {
        console.error('Error fetching comments:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const updateComment = async(req, res)=>{
    const { commentId } = req.params
    const { content } = req.body
    try {
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({ message: " comment not found"})
        }
        if(comment.createdBy.toString() !== req.user.userId){
            return res.status(403).json({ message: " You are not authorized to make changes to this comment"})
        }
        const newComment = await Comment.findByIdAndUpdate(commentId,
            { content: content || comment.content},
            { new: true}
        )
        res.status(200).json({ message: "Comment updated successfully", comment: newComment })
    } catch (error) {
        console.error('Error updating comment:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const deleteComment = async (req, res)=>{
    const { commentId } = req.params
    try {
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({ message: " comment not found"})
        }
        if(comment.createdBy.toString() !== req.user.userId){
            return res.status(403).json({ message: " You are not authorized to delete this comment"})
        }
        await Comment.deleteOne({_id: commentId})
        res.status(200).json({ message: "Comment deleted successfully"})
    } catch (error) {
        console.error('Error deleting comment:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment
}