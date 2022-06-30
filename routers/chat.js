const express = require("express");
const router = express.Router();
const {sendChat, getChat} = require("../controllers/chat")
const {getAccesToRoute} = require("../middlewares/authorization/authMiddleware")



router.get("/",getAccesToRoute,getChat)
router.post("/", getAccesToRoute , sendChat)



module.exports = router;