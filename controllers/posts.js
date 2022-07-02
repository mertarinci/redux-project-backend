const Posts = require("../models/Posts");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const  {validateUpdatePost} = require("../helpers/input/inputHelpers");



const addNewPost = asyncErrorWrapper(async (req,res) => {

    const information = req.body;


    const userId = parseInt(req.user.userId)


    const post = await Posts.create({
        title:information.title,
        content:information.content,
        postImage:information.postImage || "https://picsum.photos/300/300",
        user: userId
    });

    res.status(200)
    .json({
        success: true,
        data: post
    });

})

const getAllPosts = asyncErrorWrapper(async (req,res) => {

  
    const query = Posts.find();

    const posts = await query;

    res.status(200).json({
        success:true,
        data: posts
    })
})

const editPost = asyncErrorWrapper(async (req,res) => {

    const {id} = req.params
    const {title,content,postImage} = req.body

    if(!validateUpdatePost(title,content)){
        return next(new CustomError("Please provide a title and content. (Try to change it or just add one space)",400))
    }


    let post = await Posts.findById(id)


    post.title = title;
    post.content = content;
    post.postImage = postImage ? postImage : post.postImage

    post.save()
    

    res.status(200).json({
        success:true,
        message:"Post editted.",
        data:post
    })


})

const deletePost = asyncErrorWrapper(async (req,res) => {

    const {id} = req.params

     await Posts.findByIdAndRemove(id)

     res.status(200).json({
        success:true,
        message:"Post deleted."
    })
     



})



module.exports = {
    addNewPost,
    getAllPosts,
    editPost,
    deletePost
}






