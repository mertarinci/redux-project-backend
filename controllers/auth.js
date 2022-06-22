const asyncErrorWrapper = require("express-async-handler");
const User = require("../models/User");


const register = asyncErrorWrapper( async (req,res) => {

    const {email,username,password} = req.body;

    const user = await User.create({
        email,
        username,
        password
    })

    res.status(200).json({
        success: true,
        data: user
    })
    
})

const getAllUsers = asyncErrorWrapper(async (req,res) => {

  
    const query = User.find();

    const users = await query;

    res.status(200).json({
        success:true,
        data: users
    })
})

const login = asyncErrorWrapper(async (req,res,next) => {
    
})


module.exports = {
    register,
    getAllUsers
}