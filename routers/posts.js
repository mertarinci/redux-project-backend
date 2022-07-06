const express = require("express");
const router = express.Router();
const {addNewPost, getAllPosts, editPost, deletePost} = require("../controllers/posts");
const {getAccesToRoute, getQuestionOwner} = require("../middlewares/authorization/authMiddleware");
const { postQueryMiddleware } = require("../middlewares/query/postQueryMiddleware");
const Posts = require("../models/Posts");





router.post("/newPost",getAccesToRoute,addNewPost)

router.get("/getAllPosts",postQueryMiddleware(Posts,{
    population : {

        path:"mongoId",
        select:"username firstName lastName"

    }
}
    ),getAllPosts)
    
router.put("/:id/edit",[getAccesToRoute,getQuestionOwner],editPost)
router.delete("/:id/delete",[getAccesToRoute,getQuestionOwner],deletePost)




module.exports = router;