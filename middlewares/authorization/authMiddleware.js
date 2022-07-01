const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAcccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");



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
            isOnline: decode.isOnline
        }

        next();

    } )

}

module.exports = {
    getAccesToRoute
}