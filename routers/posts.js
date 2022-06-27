const express = require("express");
const router = express.Router();
const {addNewPost, getAllPosts} = require("../controllers/posts");
const {getAccesToRoute} = require("../middlewares/authorization/authMiddleware")





router.post("/newPost",getAccesToRoute,addNewPost)
router.get("/getAllPosts",getAllPosts)




module.exports = router;