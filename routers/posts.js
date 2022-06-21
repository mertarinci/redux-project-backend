const express = require("express");
const router = express.Router();
const {addNewPost, getAllPosts} = require("../controllers/posts")





router.post("/newPost",addNewPost)
router.get("/getAllPosts",getAllPosts)




module.exports = router;