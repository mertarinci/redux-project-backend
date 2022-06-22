const express = require("express");
const router = express.Router();
const posts = require("./posts")
const user = require("./user");




router.use("/posts",posts)
router.use("/user",user)






module.exports = router;