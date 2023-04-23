const blogModel = require("../models/blogModel")
const userModel = require("../models/userModel.js");

const createBlog = async (req,res)=>{
    const data = req.body
    const blog = await blogModel.create(data)
    res.status(201).send(blog)
}

const updateBlog  = async(req,res)=>{
    const {id} = req.params
    const updateBlog = await blogModel.findByIdAndUpdate(id , req.body ,   {new: true})
    res.status(200).send(updateBlog)
}

const getBlog = async(req,res)=>{
    const {id} = req.params
    const getBlog = await blogModel.findById(id).populate('likes').populate('dislikes')
    const updateViews = await blogModel.findByIdAndUpdate(id ,{$inc:{numViews:1}}, {new:true})
    
    return res.status(200).json(getBlog)
}

const getAllBlog = async(req,res)=>{
    const allBlog = await blogModel.find().populate('likes').populate('dislikes')
    res.status(200).send(allBlog)
}

const likeBlog = async(req,res)=>{
    const {blogId} = req.body
    const loginUserId = req.userId
    // console.log(loginUserId)
    const blog = await blogModel.findById(blogId)
    const isLiked = blog?.isLiked
    const alreadyDisliked = blog.dislikes.find(
        (userId => userId.toString() === loginUserId.toString())
    )
    if(alreadyDisliked){
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $pull:{dislikes:loginUserId},
               isDisliked:false,
            },
            {new:true}
        )
        res.send(blog)
    }
    if(isLiked){
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $pull:{likes : loginUserId},
               isLiked : false,
            },
            {new:true}
        )
        res.send(blog)
    }
    else{
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $push:{likes:loginUserId},
               isLiked:true,
            },
            {new:true}
        )
        res.send(blog)
    }
}


const disLiketheBlog = async(req,res)=>{
    const {blogId} = req.body
    const loginUserId = req.userId
    // console.log(loginUserId)
    const blog = await blogModel.findById(blogId)
    const isDisLiked = blog?.isDisliked
    const alreadyLiked = blog.likes.find(
        (userId => userId.toString() === loginUserId.toString())
    )
    if(alreadyLiked){
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $pull:{likes:loginUserId},
               isLiked:false,
            },
            {new:true}
        )
        res.send(blog)
    }
    if(isDisLiked){
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $pull:{dislikes : loginUserId},
               isDisliked : false,
            },
            {new:true}
        )
        res.send(blog)
    }
    else{
        const blog = await blogModel.findByIdAndUpdate(blogId , 
            {
               $push:{dislikes:loginUserId},
               isDisliked:true,
            },
            {new:true}
        )
        res.send(blog)
    }
}



module.exports ={ createBlog , updateBlog , getBlog , getAllBlog , likeBlog , disLiketheBlog}