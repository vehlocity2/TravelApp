const Post = require("../Models/PostModel")

const createPost = async(req, res)=>{
    const {  content } = req.body
    try {
        if( !content ){
            return res.status(404).json({ message: "Contents is required"})
        }
        const imagePath = req.files? req.files.map(file => file.path.replace(/\\/g, '/')) : []
        const userId = req.user.userId
        const post = new Post({
            content,
            images: imagePath,
            createdBy: userId
        })
        await post.save()
        res.status(201).json({ message: "Post created successfully", post }) 
    } catch (error) {
        console.error('Error creating post:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getAllPost = async(req, res)=>{
    try {
        const posts = await Post.find().populate({path:'createdBy', select: 'name image', populate: {
            path: 'auths', select: 'email -_id'
        }}).populate({ 
            path: 'comments', 
            select:"content -postId", 
            populate: {path: 'createdBy', select:'name -_id' } 
        })    //to get the name of the post creator
        if(posts.length === 0){
            return res.status(404).json({ message: "No posts found" })
        }
        res.status(200).json({ message: "All posts retrieved successfully", posts })
    } catch (error) {
        console.error('Error fetching posts:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getOnePost = async(req, res)=>{
    const { postId } = req.params
    try {
        const post = await Post.findById(postId).populate({path:'createdBy', select: 'name image', populate: {
            path: 'auths', select: 'email -_id'
        }}).populate({ 
            path: 'comments', 
            select:"content -postId", 
            populate: {path: 'createdBy', select:'name -_id' } 
        })
        if(!post){
            return res.status(404).json({ message: "Post not found" })
        }
        res.status(200).json({ message: "Post retrieved successfully", post })  
    } catch (error) {
        console.error('Error fetching post:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}
const getPostByUser = async(req,res)=>{
    const { userId } = req.params
    try{
        const posts = await Post.find({createdBy: userId}).populate({path:'createdBy', select: 'name image', populate: {
            path: 'auths', select: 'email -_id'
        }}).populate({ 
            path: 'comments', 
            select:"content -postId", 
            populate: {path: 'createdBy', select:'name -_id' } 
        })
        if (posts.length === 0) {
            return res.status(404).json({ message: "Post not found for this user"})
        }
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updatePost = async( req, res)=>{
    const { postId } = req.params
    const { title, content } = req.body
    const imagePath = req.files? req.files.map(file => file.path) : []
    try {
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ message: "Post not found"})
        }
        if(post.createdBy.toString() !== req.user.userId){
            return res.status(403).json({ message: "You are not authorized to update this post"})
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, { 
            title: title || post.title, 
            content: content || post.content, 
            image: imagePath.length > 0 ? imagePath : post.image }, 
            { new: true}
        )
        res.status(200).json({ message: "Post updated successfully", post: updatedPost })
    } catch (error) {
        console.error('Error updating post:', error)
        res.status(500).json({ message: error.message})
    }
}

const deletePost = async(req, res)=>{
    const { postId } = req.params
    try {
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ message: "Post not found"})
        }
        if(post.createdBy.toString() !== req.user.userId){
            return res.status(403).json({ message: " You are not authorized to delete this post"})
        }
        await Post.deleteOne({ _id: postId })
        res.status(200).json({ message: " Post deleted successfully"})
    } catch (error) {
        console.error('Error deleting post:', error)
        res.status(500).json({ message: error.message})
    }
}

const LikePost = async (req, res)=>{
    const { postId } = req.params
    const userId = req.user.userId
    try {
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ message: "Post not found"})
        }
        const isLiked = post.likeBy.includes(userId)
        if(isLiked){
            post.likeBy = post.likeBy.filter(id => id.toString() !== userId)
            post.likesCount = Math.max(0, post.likesCount - 1)
            await post.save()
            return res.status(200).json({ message: " Post unLiked successfully", likeBy: post.likeBy, count: post.likesCount})
        }else{
            post.likeBy.push(userId)
            post.likesCount = Math.max(0, post.likesCount + 1)
            await post.save()
            return res.status(200).json({ message: " Post liked successfully", likeBy: post.likeBy, count: post.likesCount})
        }
    } catch (error) {
        console.error('Error liking post:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = {
    createPost,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost,
    LikePost,
    getPostByUser
}