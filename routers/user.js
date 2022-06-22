const express = require("express");
const router = express.Router();
const {register, getAllUsers} = require("../controllers/auth");



router.post("/register", register)
router.get("/getAllUsers",getAllUsers)




module.exports = router;