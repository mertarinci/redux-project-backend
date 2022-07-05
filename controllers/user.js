const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

const editUser = asyncErrorWrapper(async (req,res,next) => {

    const {firstName,lastName,username} = req.body;
    const {id} = req.user;

   
    if(!username === req.user.username){
        return res.status(401).json({success:false,message:"Only profile owners can edit their page."})
    }

    const user = await User.findById(id)

    if((firstName && lastName)){
        user.firstName = firstName;
        user.lastName = lastName;
    }else{
        user.username = username;
    }

    firstName ? user.firstName = firstName :
    username ? user.username = username :
    lastName ? user.lastName = lastName :



    user.save();


    res.status(200).json({
        success:true,
        message:"Your profile edit successful.",
        data:user
    })


 
})


module.exports = {
    editUser
}