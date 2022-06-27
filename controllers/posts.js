const Posts = require("../models/Posts");
const asyncErrorWrapper = require("express-async-handler");



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



module.exports = {
    addNewPost,
    getAllPosts
}






