const asyncErrorWrapper = require("express-async-handler");
const Chat = require("../models/Chat")
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User")



const clearChat = asyncErrorWrapper(async (req,res) => {

    await Chat.collection.drop();


    res.status(200).json({
        success: true,
        message: "Chat collection dropped."
    })

})


const giveRole = asyncErrorWrapper(async (req,res) => {

    const {id,role} = req.body


    const user = await User.findById(id)

    user.role = role


    await user.save()

    res.status(200).json({
        success:true,
        message:"Role updated"
    })


})


module.exports = {
    clearChat,
    giveRole
}