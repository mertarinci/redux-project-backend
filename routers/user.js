const express = require("express");
const router = express.Router();
const {register, getAllUsers,login} = require("../controllers/auth");
const { getAccesToRoute } = require("../middlewares/authorization/authMiddleware");



router.post("/register", register)
router.post("/login",login)
router.get("/getAllUsers",getAccesToRoute,getAllUsers)




module.exports = router;