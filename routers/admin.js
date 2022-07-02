const express = require("express");
const { clearChat } = require("../controllers/admin");
const router = express.Router();
const {getAccesToRoute} = require("../middlewares/authorization/authMiddleware")



router.delete("/clearChat", getAccesToRoute ,clearChat)




module.exports = router;