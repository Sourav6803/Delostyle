const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numViews : {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref : "User",
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref : "User",
        }
    ],
    images:{
        type: String,
        default : "https://www.shutterstock.com/image-photo/blogging-blog-word-coder-coding-260nw-520314613.jpg"
    }, 
    author: {
        type: String,
        default : "Admin"
    },
    // toJSON : {
    //     virtuals: true
    // },
    // toObject: {
    //     virtuals: true
    // },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {type:Date},
    isPublished: { type: Boolean, default: false },
    publishedAt: {type:Date}
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)