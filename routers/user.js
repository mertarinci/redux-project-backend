const express = require("express");
const router = express.Router();
const {register, getAllUsers,login,forgotPassword} = require("../controllers/auth");
const { getAccesToRoute } = require("../middlewares/authorization/authMiddleware");
const {userQueryMiddleware} = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User");




router.post("/register", register)
router.post("/login",login)
router.get("/getAllUsers",userQueryMiddleware(User),getAllUsers)
router.post("/forgotPassword",forgotPassword);




module.exports = router;