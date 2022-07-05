const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAcccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");
const Posts = require("../../models/Posts");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");





const getAccesToRoute = function(req,res,next){
    

    const {JWT_SECRET} = process.env;

    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route.",401));
    }

    const accessToken = getAcccessTokenFromHeader(req);

    jwt.verify(accessToken,JWT_SECRET,(err,decode) =>{

        if(err){
            return next(new CustomError("You are not authorized to access this route.",401));
             
        }
        req.user = {
            id:decode.id,
            userId: decode.userId,
            username: decode.username,
            email: decode.email,
            role: decode.role,
            isOnline: decode.isOnline,
            firstName: decode.firstName,
            lastName: decode.lastName
        }

        next();

    } )

}

const getQuestionOwner =  asyncErrorWrapper(async (req,res,next) =>{

    const {userId} = req.user;
    const {id} = req.params

    const post = await Posts.findById(id)

    const user =  await User.find({userId})


    if(user[0].role !== "admin"){
        if(post.user !== userId){
            return next(new CustomError("Only question owner and admins can edit posts.",403))
        }
    }


    next();

})

module.exports = {
    getAccesToRoute,
    getQuestionOwner
}