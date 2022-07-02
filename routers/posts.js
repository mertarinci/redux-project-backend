const express = require("express");
const router = express.Router();
const {addNewPost, getAllPosts, editPost, deletePost} = require("../controllers/posts");
const {getAccesToRoute, getQuestionOwner} = require("../middlewares/authorization/authMiddleware")





router.post("/newPost",getAccesToRoute,addNewPost)
router.get("/getAllPosts",getAllPosts)
router.put("/:id/edit",[getAccesToRoute,getQuestionOwner],editPost)
router.delete("/:id/delete",[getAccesToRoute,getQuestionOwner],deletePost)




module.exports = router;