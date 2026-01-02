const mongoose = require('mongoose');
require('./CommentModel')

const postSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [String],
    likeBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 },
    // comments: [{
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //     content: { type: String, required: true },
    //     createdAt: { type: Date, default: Date.now },
    //     updatedAt: { type: Date, default: Date.now }
    // }]
},{ timestamps: true });

postSchema.virtual('comments',{
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
})

postSchema.set("toObject", { virtuals: true })
postSchema.set('toJSON', { virtuals: true })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
