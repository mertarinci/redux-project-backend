const Posts = require("../models/Posts");
const asyncErrorWrapper = require("express-async-handler");



const addNewPost = asyncErrorWrapper(async (req,res) => {

    const information = req.body;

    const post = await Posts.create({
        title:information.title,
        content:information.content,
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






