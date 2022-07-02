const express = require("express");
const router = express.Router();
const posts = require("./posts")
const user = require("./user");
const chat = require("./chat")
const admin = require("./admin")




router.use("/posts",posts)
router.use("/user",user)
router.use("/chat",chat)
router.use("/admin",admin)






module.exports = router;