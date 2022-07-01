const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const { validateUserInput, comparePassword } = require("../helpers/input/inputHelpers");
const User = require("../models/User");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");


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
    
    const {username,password,isOnline} = req.body;


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

const forgotPassword = asyncErrorWrapper(async (req,res,next) => {

    const resetEmail = req.body.email


    const user = await User.findOne({
        email: resetEmail
    });

    if(!user){
        return next(new CustomError("User not found! (Invalid Email)",400))
    }

    const resetPasswordToken = user.getResetToken();


    await user.save();

    const resetPasswordUrl = `http://localhost:3000/resetPassword?resetPasswordToken=${resetPasswordToken}`

    const emailTemp = `
    <h1>Reset Your Password</h1>
    <p><a href="${resetPasswordUrl}">This</a> is your reset token.</p>
    <p>Tıklayamıyorsanız: ${resetPasswordUrl}</p>
    ` ;

    try{

        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemp
        });

        return res.status(200).json({
            sucess: true,
            message:"Token Sent to your email."
        })

    }catch(err){

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email couldn't be sent",500))

    }


})

const resetPassword = asyncErrorWrapper(async (req,res,next) => {

    const {resetPasswordToken} = req.query;

    const {password} = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("You don't have a valid token!",400))
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt: Date.now()}
    })

    if(!user){
        return next(new CustomError("Invalid token or Reset Password Session Expired",404))
    }

    user.password = password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const emailTemp = `
    <h1>You have changed your password.</h1>
    <p>Thanks for choosing us.</p>
    <p>To contact: Patrianch#3873 on Discord.</p>
    ` ;

    try{

        await sendEmail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Your password resetted.",
            html: emailTemp
        });

        return res.status(200)
        .json({
            success: true,
            message: "Reset Password Completed"
        })

    }catch(err){

        return next(new CustomError("Email couldn't be sent",500))

    }


})

const logout = asyncErrorWrapper(async (req,res,next) => {


    const {username} = req.body;

    const user = await User.findOne({username})

    user.isOnline = false

    await user.save()

    res.status(200).json({
        success:true,
        message:"Logout successful."
    })
})




module.exports = {
    register,
    getAllUsers,
    login,
    forgotPassword,
    resetPassword,
    logout
}