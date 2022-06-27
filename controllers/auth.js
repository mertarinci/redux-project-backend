const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const { validateUserInput, comparePassword } = require("../helpers/input/inputHelpers");
const User = require("../models/User");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers")


const register = asyncErrorWrapper( async (req,res) => {

    const {email,username,password} = req.body;

    const user = await User.create({
        email,
        username,
        password
    })

    res.status(200).json({
        success: true,
        data: {
            email:user.email,
            username:user.username,
            userId:user.userId,
            profileImage:user.profileImage
        }
    })
    
})

const getAllUsers = asyncErrorWrapper(async (req,res) => {

  



    res.status(200).json(res.queryResult)
})

const login = asyncErrorWrapper(async (req,res,next) => {
    
    const {username,password} = req.body;


    if(!validateUserInput(username,password)){
        return next(new CustomError("Username or password is missing.",400))
    }



    let userCheck = await User.findOne({username})

    if(userCheck !== null){

        const user = await User.findOne({username}).select("+password")

        if(!comparePassword(password,user.password)){
            return next(new CustomError("Username or password invalid.",400))
        }

        sendJwtToClient(user,res)
        
    }else{
        next(new CustomError("User not found",400))
    }



})


module.exports = {
    register,
    getAllUsers,
    login
}