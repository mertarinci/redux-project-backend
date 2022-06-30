const express = require("express");
const router = express.Router();
const posts = require("./posts")
const user = require("./user");
const chat = require("./chat")




router.use("/posts",posts)
router.use("/user",user)
router.use("/chat",chat)






module.exports = router;