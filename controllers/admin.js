const asyncErrorWrapper = require("express-async-handler");
const Chat = require("../models/Chat")
const CustomError = require("../helpers/error/CustomError");



const clearChat = asyncErrorWrapper(async (req,res) => {

    await Chat.collection.drop();


    res.status(200).json({
        success: true,
        message: "Chat collection dropped."
    })

})


module.exports = {
    clearChat
}