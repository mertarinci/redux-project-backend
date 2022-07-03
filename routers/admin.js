const express = require("express");
const { clearChat, giveRole } = require("../controllers/admin");
const router = express.Router();
const {getAccesToRoute} = require("../middlewares/authorization/authMiddleware")



router.delete("/clearChat", getAccesToRoute ,clearChat)
router.put("/giveRole",giveRole)




module.exports = router;