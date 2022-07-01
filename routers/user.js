const express = require("express");
const router = express.Router();
const {register, getAllUsers,login,forgotPassword, resetPassword, logout} = require("../controllers/auth");
const { getAccesToRoute } = require("../middlewares/authorization/authMiddleware");
const {userQueryMiddleware} = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User");




router.post("/register", register)
router.post("/login",login)
router.get("/getAllUsers",userQueryMiddleware(User),getAllUsers)
router.post("/forgotPassword",forgotPassword);
router.put("/resetPassword",resetPassword);
router.post("/logout",logout)



// GET POST PUT DELETE

// GET : Bir şey isterken
// POST: Bir şey gönderirken
// PUT: Bir şeyi değiştirirken.
// DELETE: Bir şeyi silerken.




module.exports = router;