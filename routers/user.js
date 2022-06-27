const express = require("express");
const router = express.Router();
const {register, getAllUsers,login} = require("../controllers/auth");
const { getAccesToRoute } = require("../middlewares/authorization/authMiddleware");
const {userQueryMiddleware} = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User");



router.post("/register", register)
router.post("/login",login)
router.get("/getAllUsers",userQueryMiddleware(User),getAllUsers)




module.exports = router;