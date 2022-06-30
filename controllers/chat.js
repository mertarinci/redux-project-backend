const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const Chat = require("../models/Chat")


const sendChat = asyncErrorWrapper(async (req,res) => {

    const info = req.body;

    const username = req.user.username;
    const role = req.user.role;

    const message = await Chat.create({
        message:info.message,
        user: username,
        userRole: role

    });

    res.status(200)
    .json({
        success: true,
        data: message
    });

})

const getChat = asyncErrorWrapper(async (req,res) => {

    const query = Chat.find().sort({createdAt:1});

    const messages = await query;

    res.status(200).json({
        success:true,
        data: messages
    })

})



module.exports = {
    sendChat,
    getChat
}